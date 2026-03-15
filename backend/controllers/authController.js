const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');

/* ── Helpers ─────────────────────────────────────────────── */

/** Generate a short-lived access token (15 min) */
const generateAccessToken = (userId) =>
    jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

/** Generate both access + refresh tokens */
const generateTokens = async (userId) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = await RefreshToken.createToken(userId);
    return { accessToken, refreshToken };
};

/* ── Controllers ─────────────────────────────────────────── */

/* POST /api/auth/register */
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ success: false, message: 'Email already registered' });
        }

        const user = await User.create({ name, email, password });
        const { accessToken, refreshToken } = await generateTokens(user._id);

        res.status(201).json({
            success: true,
            accessToken,
            refreshToken,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};

/* POST /api/auth/login */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const match = await user.comparePassword(password);
        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = await generateTokens(user._id);

        res.json({
            success: true,
            accessToken,
            refreshToken,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};

/* POST /api/auth/refresh — rotate token pair */
exports.refreshToken = async (req, res, next) => {
    try {
        const { refreshToken: token } = req.body;
        if (!token) {
            return res.status(400).json({ success: false, message: 'Refresh token required' });
        }

        const stored = await RefreshToken.findByToken(token);
        if (!stored) {
            return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
        }

        // Verify the user still exists
        const user = await User.findById(stored.user).select('-password');
        if (!user) {
            await stored.deleteOne();
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        // Rotate: delete old token, issue new pair
        await stored.deleteOne();
        const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user._id);

        res.json({
            success: true,
            accessToken,
            refreshToken: newRefreshToken,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};

/* POST /api/auth/logout — invalidate refresh token */
exports.logout = async (req, res, next) => {
    try {
        const { refreshToken: token } = req.body;
        if (token) {
            const stored = await RefreshToken.findByToken(token);
            if (stored) await stored.deleteOne();
        }

        res.json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
};

/* GET /api/auth/me — return current user */
exports.getMe = async (req, res) => {
    res.json({ success: true, user: req.user });
};
