const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['Sekuwa', 'BBQ', 'Nepali Thali', 'Beverages'] },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
    available: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);
