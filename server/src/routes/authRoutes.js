const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/google', authController.googleAuth);
router.get('/me', protect, authController.getMe);

// Email verification endpoints
router.post('/verify-email', authController.verifyEmail);
router.get('/verify-email', authController.verifyEmail);
router.post('/resend-verification', optionalAuth, authController.resendVerification);

module.exports = router;
