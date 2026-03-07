const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authenticate, authorize } = require('../middlewares/auth');
const { validateTeacher } = require('../middlewares/validation');

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('ADMIN'));

router.post('/', validateTeacher, teacherController.create);
router.get('/', teacherController.getAll);
router.get('/:teacherId', teacherController.getById);
router.put('/:teacherId', teacherController.update);

module.exports = router;
