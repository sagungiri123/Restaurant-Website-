const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};

/* GET /api/auth/me — return current user */
exports.getMe = async (req, res) => {
    res.json({ success: true, user: req.user });
};
