const express = require('express');
const router = express.Router();
const refundController = require('../controllers/refundController');
const { authenticate, authorize } = require('../middlewares/auth');

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('ADMIN'));

router.get('/', refundController.getAll);
router.put('/:refundId/approve', refundController.approve);
router.put('/:refundId/reject', refundController.reject);

module.exports = router;
