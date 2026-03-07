const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { authenticate, authorize } = require('../middlewares/auth');
const { validateClass } = require('../middlewares/validation');

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('ADMIN'));

router.post('/', validateClass, classController.create);
router.get('/', classController.getAll);
router.get('/:classId', classController.getById);
router.put('/:classId', classController.update);
router.put('/:classId/assign-teacher', classController.assignTeacher);

module.exports = router;
