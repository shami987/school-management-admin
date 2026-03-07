const classService = require('../services/classService');

// Create class
const create = async (req, res, next) => {
  try {
    const classData = await classService.createClass(req.body);
    res.status(201).json({
      message: 'Class created successfully',
      class: classData,
    });
  } catch (error) {
    next(error);
  }
};

// Get all classes
const getAll = async (req, res, next) => {
  try {
    const classes = await classService.getAllClasses();
    res.json({ classes });
  } catch (error) {
    next(error);
  }
};

// Get class by ID
const getById = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const classData = await classService.getClassById(classId);
    res.json({ class: classData });
  } catch (error) {
    next(error);
  }
};

// Update class
const update = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const classData = await classService.updateClass(classId, req.body);
    res.json({
      message: 'Class updated successfully',
      class: classData,
    });
  } catch (error) {
    next(error);
  }
};

// Assign teacher
const assignTeacher = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const { teacherId } = req.body;
    const classData = await classService.assignTeacher(classId, teacherId);
    res.json({
      message: 'Teacher assigned successfully',
      class: classData,
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
  assignTeacher,
};
