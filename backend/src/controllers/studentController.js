const studentService = require('../services/studentService');

// Create student
const create = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json({
      message: 'Student created successfully',
      student,
    });
  } catch (error) {
    next(error);
  }
};

// Get all students
const getAll = async (req, res, next) => {
  try {
    const students = await studentService.getAllStudents();
    res.json({ students });
  } catch (error) {
    next(error);
  }
};

// Get student by ID
const getById = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await studentService.getStudentById(studentId);
    res.json({ student });
  } catch (error) {
    next(error);
  }
};

// Update student
const update = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await studentService.updateStudent(studentId, req.body);
    res.json({
      message: 'Student updated successfully',
      student,
    });
  } catch (error) {
    next(error);
  }
};

// Delete student
const remove = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    await studentService.deleteStudent(studentId);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
