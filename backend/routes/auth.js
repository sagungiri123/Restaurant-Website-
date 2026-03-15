const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { register, login, refreshToken, logout, getMe } = require('../controllers/authController');
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

// Rate limit on register — 5 per hour per IP
const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Too many registration attempts, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

/* POST /api/auth/register */
router.post(
    '/register',
    registerLimiter,
    validate([
        body('name').trim().notEmpty().isLength({ max: 100 }).escape().withMessage('Name is required (max 100 chars)'),
        body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
        body('password').isLength({ min: 6, max: 128 }).withMessage('Password must be 6–128 characters'),
        body('confirmPassword').custom((val, { req }) => {
            if (val !== req.body.password) throw new Error('Passwords do not match');
            return true;
        }),
    ]),
    register
);

/* POST /api/auth/login */
router.post(
    '/login',
    loginLimiter,
    validate([
        body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
        body('password').notEmpty().isLength({ max: 128 }).withMessage('Password required'),
    ]),
    login
);

/* POST /api/auth/refresh — rotate tokens */
router.post(
    '/refresh',
    validate([
        body('refreshToken').notEmpty().withMessage('Refresh token required'),
    ]),
    refreshToken
);

/* POST /api/auth/logout — invalidate refresh token */
router.post('/logout', logout);

/* GET /api/auth/me — get current authenticated user */
router.get('/me', protect, getMe);

module.exports = router;
