const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');

// 10 orders per hour per IP
const orderLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: { success: false, message: 'Too many orders. Please try again later.' },
});

router.post(
    '/',
    orderLimiter,
    validate([
        body('items').isArray({ min: 1, max: 50 }).withMessage('1–50 items required'),
        body('items.*.name').trim().notEmpty().isLength({ max: 100 }).withMessage('Item name required'),
        body('items.*.price').isFloat({ min: 0, max: 100000 }).withMessage('Invalid item price'),
        body('items.*.quantity').isInt({ min: 1, max: 100 }).withMessage('Quantity must be 1–100'),
        body('totalPrice').isFloat({ min: 0, max: 1000000 }).withMessage('Invalid total price'),
        body('customerInfo.name').trim().notEmpty().isLength({ max: 100 }).escape().withMessage('Customer name required'),
        body('customerInfo.phone').trim().notEmpty().isLength({ max: 20 }).escape().withMessage('Customer phone required'),
        body('customerInfo.email').optional().isEmail().normalizeEmail(),
        body('customerInfo.address').optional().trim().isLength({ max: 300 }).escape(),
    ]),
    createOrder
);

router.get('/', protect, authorize('admin'), getOrders);

router.put(
    '/:id',
    protect,
    authorize('admin'),
    validate([
        body('status').isIn(['Pending', 'Preparing', 'Completed', 'Cancelled']).withMessage('Invalid status'),
    ]),
    updateOrderStatus
);

module.exports = router;
