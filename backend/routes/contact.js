const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { createMessage } = require('../controllers/contactController');

// 3 contact messages per hour per IP
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: { success: false, message: 'Too many messages. Please try again later.' },
});

router.post(
    '/',
    contactLimiter,
    validate([
        body('name').trim().notEmpty().isLength({ max: 100 }).escape().withMessage('Name is required (max 100 chars)'),
        body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
        body('message').trim().notEmpty().isLength({ max: 1000 }).escape().withMessage('Message is required (max 1000 chars)'),
    ]),
    createMessage
);

module.exports = router;
