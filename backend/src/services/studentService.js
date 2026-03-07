const prisma = require('../config/database');

// Create student
const createStudent = async (data) => {
  const student = await prisma.student.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: new Date(data.dateOfBirth),
      parentId: data.parentId,
      classId: data.classId || null,
      feeBalance: {
        create: {
          balance: data.initialBalance || 0,
        },
      },
    },
    include: {
      class: true,
      parent: {
        include: {
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  return student;
};

// Get all students
const getAllStudents = async () => {
  const students = await prisma.student.findMany({
    include: {
      class: true,
      feeBalance: true,
      parent: {
        include: {
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return students;
};

// Get student by ID
const getStudentById = async (studentId) => {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      class: true,
      feeBalance: true,
      parent: {
        include: {
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      grades: true,
      attendance: {
        orderBy: { date: 'desc' },
        take: 10,
      },
    },
  });

  if (!student) {
    throw new Error('Student not found');
  }

  return student;
};

// Update student
const updateStudent = async (studentId, data) => {
  const student = await prisma.student.update({
    where: { id: studentId },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      classId: data.classId,
    },
    include: {
      class: true,
    },
  });

  return student;
};

// Delete student
const deleteStudent = async (studentId) => {
  await prisma.student.delete({
    where: { id: studentId },
  });
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
