const Order = require('../models/Order');

/* POST /api/orders — public, create order */
exports.createOrder = async (req, res, next) => {
    try {
        const { items, totalPrice, customerInfo } = req.body;
        const order = await Order.create({ items, totalPrice, customerInfo });
        res.status(201).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

/* GET /api/orders — admin only */
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        next(err);
    }
};

/* PUT /api/orders/:id — admin, update status */
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};
