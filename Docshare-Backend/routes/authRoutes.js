const express = require('express');
const { registerUser, loginUser, verifyOTP } = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.post('/verify-otp', authLimiter, verifyOTP);

module.exports = router;
