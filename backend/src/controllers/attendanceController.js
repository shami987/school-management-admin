const attendanceService = require('../services/attendanceService');

// Mark attendance
const mark = async (req, res, next) => {
  try {
    const attendance = await attendanceService.markAttendance(req.body);
    res.status(201).json({
      message: 'Attendance marked successfully',
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Get attendance by student
const getByStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;
    const attendance = await attendanceService.getAttendanceByStudent(studentId, startDate, endDate);
    res.json({ attendance });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  mark,
  getByStudent,
};
