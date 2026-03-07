const prisma = require('../config/database');
const { hashPassword } = require('../utils/password');

// Create teacher
const createTeacher = async (data) => {
  // Check if email exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user and teacher profile
  const teacher = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'TEACHER',
      teacherProfile: {
        create: {
          phone: data.phone || null,
          subject: data.subject || null,
        },
      },
    },
    include: {
      teacherProfile: true,
    },
  });

  return teacher;
};

// Get all teachers
const getAllTeachers = async () => {
  const teachers = await prisma.user.findMany({
    where: { role: 'TEACHER' },
    include: {
      teacherProfile: {
        include: {
          classes: true,
        },
      },
    },
  });

  return teachers;
};

// Get teacher by ID
const getTeacherById = async (teacherId) => {
  const teacher = await prisma.user.findUnique({
    where: { id: teacherId, role: 'TEACHER' },
    include: {
      teacherProfile: {
        include: {
          classes: {
            include: {
              students: true,
            },
          },
        },
      },
    },
  });

  if (!teacher) {
    throw new Error('Teacher not found');
  }

  return teacher;
};

// Update teacher
const updateTeacher = async (teacherId, data) => {
  const teacher = await prisma.user.update({
    where: { id: teacherId },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      teacherProfile: {
        update: {
          phone: data.phone,
          subject: data.subject,
        },
      },
    },
    include: {
      teacherProfile: true,
    },
  });

  return teacher;
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
};
