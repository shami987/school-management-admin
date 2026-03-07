const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Login validation
const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
  body('deviceId').notEmpty().withMessage('Device ID required'),
  handleValidationErrors,
];

// Student creation validation
const validateStudent = [
  body('firstName').trim().notEmpty().withMessage('First name required'),
  body('lastName').trim().notEmpty().withMessage('Last name required'),
  body('dateOfBirth').isISO8601().withMessage('Valid date of birth required'),
  body('parentId').isUUID().withMessage('Valid parent ID required'),
  handleValidationErrors,
];

// Teacher creation validation
const validateTeacher = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('firstName').trim().notEmpty().withMessage('First name required'),
  body('lastName').trim().notEmpty().withMessage('Last name required'),
  handleValidationErrors,
];

// Class creation validation
const validateClass = [
  body('name').trim().notEmpty().withMessage('Class name required'),
  body('grade').trim().notEmpty().withMessage('Grade required'),
  body('academicYear').trim().notEmpty().withMessage('Academic year required'),
  handleValidationErrors,
];

// Grade creation validation
const validateGrade = [
  body('studentId').isUUID().withMessage('Valid student ID required'),
  body('subject').trim().notEmpty().withMessage('Subject required'),
  body('score').isFloat({ min: 0 }).withMessage('Valid score required'),
  body('maxScore').isFloat({ min: 0 }).withMessage('Valid max score required'),
  body('term').trim().notEmpty().withMessage('Term required'),
  body('academicYear').trim().notEmpty().withMessage('Academic year required'),
  handleValidationErrors,
];

// Attendance validation
const validateAttendance = [
  body('studentId').isUUID().withMessage('Valid student ID required'),
  body('date').isISO8601().withMessage('Valid date required'),
  body('status').trim().notEmpty().withMessage('Status required'),
  handleValidationErrors,
];

module.exports = {
  validateLogin,
  validateStudent,
  validateTeacher,
  validateClass,
  validateGrade,
  validateAttendance,
};
