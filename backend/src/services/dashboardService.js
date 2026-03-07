const prisma = require('../config/database');

// Get dashboard statistics
const getDashboardStats = async () => {
  // Count totals
  const [
    totalStudents,
    totalParents,
    totalTeachers,
    totalClasses,
    pendingDevices,
    pendingRefunds,
  ] = await Promise.all([
    prisma.student.count(),
    prisma.user.count({ where: { role: 'PARENT' } }),
    prisma.user.count({ where: { role: 'TEACHER' } }),
    prisma.class.count(),
    prisma.device.count({ where: { status: 'PENDING' } }),
    prisma.refundRequest.count({ where: { status: 'PENDING' } }),
  ]);

  // Calculate total fee collection
  const feeTransactions = await prisma.feeTransaction.aggregate({
    where: { type: 'DEPOSIT' },
    _sum: { amount: true },
  });

  const totalFeeCollection = feeTransactions._sum.amount || 0;

  // Calculate attendance rate (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const attendanceRecords = await prisma.attendance.findMany({
    where: {
      date: { gte: thirtyDaysAgo },
    },
  });

  const presentCount = attendanceRecords.filter(a => a.status === 'PRESENT').length;
  const attendanceRate = attendanceRecords.length > 0 
    ? ((presentCount / attendanceRecords.length) * 100).toFixed(2)
    : 0;

  return {
    totalStudents,
    totalParents,
    totalTeachers,
    totalClasses,
    pendingDevices,
    pendingRefunds,
    totalFeeCollection: parseFloat(totalFeeCollection),
    attendanceRate: parseFloat(attendanceRate),
  };
};

module.exports = {
  getDashboardStats,
};
