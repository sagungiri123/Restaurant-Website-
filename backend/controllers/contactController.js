const ContactMessage = require('../models/ContactMessage');

/* POST /api/contact — public */
exports.createMessage = async (req, res, next) => {
    try {
        const message = await ContactMessage.create(req.body);
        res.status(201).json({ success: true, data: message });
    } catch (err) {
        next(err);
    }
};
