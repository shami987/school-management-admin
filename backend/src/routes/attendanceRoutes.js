const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authenticate, authorize } = require('../middlewares/auth');
const { validateAttendance } = require('../middlewares/validation');

// All routes require admin or teacher authentication
router.use(authenticate);
router.use(authorize('ADMIN', 'TEACHER'));

router.post('/', validateAttendance, attendanceController.mark);
router.get('/student/:studentId', attendanceController.getByStudent);

module.exports = router;
