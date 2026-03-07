const Menu = require('../models/Menu');

/* GET /api/menu — public, supports ?category filter */
exports.getMenuItems = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.category) filter.category = req.query.category;

        const items = await Menu.find(filter).sort({ category: 1, name: 1 });
        res.json({ success: true, count: items.length, data: items });
    } catch (err) {
        next(err);
    }
};

/* GET /api/menu/:id */
exports.getMenuItem = async (req, res, next) => {
    try {
        const item = await Menu.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.json({ success: true, data: item });
    } catch (err) {
        next(err);
    }
};

/* POST /api/menu — admin only */
exports.createMenuItem = async (req, res, next) => {
    try {
        const item = await Menu.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (err) {
        next(err);
    }
};

/* PUT /api/menu/:id — admin only */
exports.updateMenuItem = async (req, res, next) => {
    try {
        const item = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.json({ success: true, data: item });
    } catch (err) {
        next(err);
    }
};

/* DELETE /api/menu/:id — admin only */
exports.deleteMenuItem = async (req, res, next) => {
    try {
        const item = await Menu.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.json({ success: true, message: 'Item deleted' });
    } catch (err) {
        next(err);
    }
};
