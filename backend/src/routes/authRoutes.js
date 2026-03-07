const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin } = require('../middlewares/validation');
const { authLimiter } = require('../middlewares/rateLimiter');

// Login
router.post('/login', authLimiter, validateLogin, authController.login);

module.exports = router;
