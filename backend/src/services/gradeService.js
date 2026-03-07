const prisma = require('../config/database');

// Create or update grade
const upsertGrade = async (data) => {
  const grade = await prisma.grade.upsert({
    where: {
      studentId_subject_term_academicYear: {
        studentId: data.studentId,
        subject: data.subject,
        term: data.term,
        academicYear: data.academicYear,
      },
    },
    update: {
      score: data.score,
      maxScore: data.maxScore,
      remarks: data.remarks || null,
    },
    create: {
      studentId: data.studentId,
      subject: data.subject,
      score: data.score,
      maxScore: data.maxScore,
      term: data.term,
      academicYear: data.academicYear,
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

  return grade;
};

// Get grades by student
const getGradesByStudent = async (studentId) => {
  const grades = await prisma.grade.findMany({
    where: { studentId },
    orderBy: { createdAt: 'desc' },
  });

  return grades;
};

module.exports = {
  upsertGrade,
  getGradesByStudent,
};
