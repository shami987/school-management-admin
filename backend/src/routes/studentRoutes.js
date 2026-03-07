const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticate, authorize } = require('../middlewares/auth');
const { validateStudent } = require('../middlewares/validation');

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('ADMIN'));

router.post('/', validateStudent, studentController.create);
router.get('/', studentController.getAll);
router.get('/:studentId', studentController.getById);
router.put('/:studentId', studentController.update);
router.delete('/:studentId', studentController.remove);

module.exports = router;
