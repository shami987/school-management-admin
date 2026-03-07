const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const { authenticate, authorize } = require('../middlewares/auth');

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('ADMIN'));

router.get('/pending', deviceController.getPending);
router.get('/', deviceController.getAll);
router.put('/:deviceId/verify', deviceController.verify);
router.put('/:deviceId/reject', deviceController.reject);

module.exports = router;
