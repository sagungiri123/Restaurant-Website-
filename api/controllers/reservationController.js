const Reservation = require('../models/Reservation');

/* POST /api/reservations — public */
exports.createReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json({ success: true, data: reservation });
    } catch (err) {
        next(err);
    }
};

/* GET /api/reservations — admin only */
exports.getReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json({ success: true, count: reservations.length, data: reservations });
    } catch (err) {
        next(err);
    }
};
