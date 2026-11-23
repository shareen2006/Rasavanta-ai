const express = require('express');
const router = express.Router();
const pantryController = require('../controllers/pantryController');
const { protect } = require('../middleware/authMiddleware');

// All pantry routes require verified JWT authentication
router.use(protect);

router.get('/', pantryController.getPantry);
router.post('/', pantryController.addPantryItem);
router.put('/:id', pantryController.updatePantryItem);
router.delete('/:id', pantryController.deletePantryItem);

module.exports = router;
