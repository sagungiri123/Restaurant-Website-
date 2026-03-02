const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, isAdmin } = require('../middleware/auth');
const {
    getMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} = require('../controllers/menuController');

// Public
router.get('/', getMenuItems);
router.get('/:id', getMenuItem);

// Admin only
const menuValidation = validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').isIn(['Sekuwa', 'BBQ', 'Nepali Thali', 'Beverages']).withMessage('Invalid category'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
]);

router.post('/', protect, isAdmin, menuValidation, createMenuItem);
router.put('/:id', protect, isAdmin, updateMenuItem);
router.delete('/:id', protect, isAdmin, deleteMenuItem);

module.exports = router;
