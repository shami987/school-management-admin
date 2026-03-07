const gradeService = require('../services/gradeService');

// Create or update grade
const upsert = async (req, res, next) => {
  try {
    const grade = await gradeService.upsertGrade(req.body);
    res.status(201).json({
      message: 'Grade saved successfully',
      grade,
    });
  } catch (error) {
    next(error);
  }
};

// Get grades by student
const getByStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const grades = await gradeService.getGradesByStudent(studentId);
    res.json({ grades });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upsert,
  getByStudent,
};
