const teacherService = require('../services/teacherService');

// Create teacher
const create = async (req, res, next) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);
    res.status(201).json({
      message: 'Teacher created successfully',
      teacher,
    });
  } catch (error) {
    next(error);
  }
};

// Get all teachers
const getAll = async (req, res, next) => {
  try {
    const teachers = await teacherService.getAllTeachers();
    res.json({ teachers });
  } catch (error) {
    next(error);
  }
};

// Get teacher by ID
const getById = async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const teacher = await teacherService.getTeacherById(teacherId);
    res.json({ teacher });
  } catch (error) {
    next(error);
  }
};

// Update teacher
const update = async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const teacher = await teacherService.updateTeacher(teacherId, req.body);
    res.json({
      message: 'Teacher updated successfully',
      teacher,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
