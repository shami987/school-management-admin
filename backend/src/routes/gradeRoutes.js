const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const { authenticate, authorize } = require('../middlewares/auth');
const { validateGrade } = require('../middlewares/validation');

// All routes require admin or teacher authentication
router.use(authenticate);
router.use(authorize('ADMIN', 'TEACHER'));

router.post('/', validateGrade, gradeController.upsert);
router.get('/student/:studentId', gradeController.getByStudent);

module.exports = router;
