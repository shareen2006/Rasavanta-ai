const express = require('express');
const router = express.Router();
const rasabotController = require('../controllers/rasabotController');

// Chat endpoint
router.post('/chat', rasabotController.chat);
router.get('/status', rasabotController.getStatus);

module.exports = router;
