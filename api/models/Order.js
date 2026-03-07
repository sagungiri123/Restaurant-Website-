const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    items: { type: [orderItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    customerInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, default: '' },
        address: { type: String, default: '' },
    },
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
