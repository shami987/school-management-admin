const prisma = require('../config/database');

// Mark attendance
const markAttendance = async (data) => {
  const attendance = await prisma.attendance.upsert({
    where: {
      studentId_date: {
        studentId: data.studentId,
        date: new Date(data.date),
      },
    },
    update: {
      status: data.status,
      remarks: data.remarks || null,
    },
    create: {
      studentId: data.studentId,
      date: new Date(data.date),
      status: data.status,
      remarks: data.remarks || null,
    },
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return attendance;
};

// Get attendance by student
const getAttendanceByStudent = async (studentId, startDate, endDate) => {
  const where = { studentId };
  
  if (startDate || endDate) {
    where.date = {};
    if (startDate) where.date.gte = new Date(startDate);
    if (endDate) where.date.lte = new Date(endDate);
  }

  const attendance = await prisma.attendance.findMany({
    where,
    orderBy: { date: 'desc' },
  });

  return attendance;
};

module.exports = {
  markAttendance,
  getAttendanceByStudent,
};
