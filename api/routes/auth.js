const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Strict rate limit on login — 5 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Too many login attempts, please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post(
    '/login',
    loginLimiter,
    validate([
        body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
        body('password').notEmpty().isLength({ max: 128 }).withMessage('Password required'),
    ]),
    login
);

router.get('/me', protect, getMe);

module.exports = router;
