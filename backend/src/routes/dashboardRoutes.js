const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticate, authorize } = require('../middlewares/auth');

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('ADMIN'));

router.get('/stats', dashboardController.getStats);

module.exports = router;
