const jwt = require('jsonwebtoken');
const User = require('../models/User');

/* ── protect — verify JWT access token ───────────────────── */
const protect = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        next();
    } catch (err) {
        // Distinguish expired vs invalid so the frontend can auto-refresh
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired', tokenExpired: true });
        }
        return res.status(401).json({ success: false, message: 'Token invalid' });
    }
};

/* ── authorize — role-based access control ───────────────── */
/**
 * Usage: authorize('admin')  or  authorize('admin', 'user')
 * Must be used AFTER protect middleware (req.user must exist)
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Required role: ${roles.join(' or ')}`,
            });
        }
        next();
    };
};

module.exports = { protect, authorize };
