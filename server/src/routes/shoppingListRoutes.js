const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');
const { protect } = require('../middleware/authMiddleware');

// All shopping basket operations require verified authentication
router.use(protect);

router.get('/', shoppingListController.getBasket);
router.post('/', shoppingListController.saveBasket);

module.exports = router;
