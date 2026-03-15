const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');
const { createReservation, getReservations } = require('../controllers/reservationController');

// 5 reservations per hour per IP
const reservationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Too many reservations. Please try again later.' },
});

router.post(
    '/',
    reservationLimiter,
    validate([
        body('name').trim().notEmpty().isLength({ max: 100 }).escape().withMessage('Name is required'),
        body('phone').trim().notEmpty().isLength({ max: 20 }).escape().withMessage('Phone is required'),
        body('date').notEmpty().isISO8601({ strict: true }).withMessage('Valid date required (YYYY-MM-DD)'),
        body('time').notEmpty().matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Valid time required (HH:MM)'),
        body('guests').isInt({ min: 1, max: 50 }).withMessage('Guests must be 1–50'),
    ]),
    createReservation
);

router.get('/', protect, authorize('admin'), getReservations);

module.exports = router;
