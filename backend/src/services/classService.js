const prisma = require('../config/database');

// Create class
const createClass = async (data) => {
  const classData = await prisma.class.create({
    data: {
      name: data.name,
      grade: data.grade,
      section: data.section || null,
      teacherId: data.teacherId || null,
      academicYear: data.academicYear,
    },
    include: {
      teacher: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return classData;
};

// Get all classes
const getAllClasses = async () => {
  const classes = await prisma.class.findMany({
    include: {
      teacher: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
      students: true,
      timetables: true,
    },
    orderBy: { name: 'asc' },
  });

  return classes;
};

// Get class by ID
const getClassById = async (classId) => {
  const classData = await prisma.class.findUnique({
    where: { id: classId },
    include: {
      teacher: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
      students: {
        include: {
          feeBalance: true,
        },
      },
      timetables: true,
    },
  });

  if (!classData) {
    throw new Error('Class not found');
  }

  return classData;
};

// Update class
const updateClass = async (classId, data) => {
  const classData = await prisma.class.update({
    where: { id: classId },
    data: {
      name: data.name,
      grade: data.grade,
      section: data.section,
      teacherId: data.teacherId,
      academicYear: data.academicYear,
    },
    include: {
      teacher: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  return classData;
};

// Assign teacher to class
const assignTeacher = async (classId, teacherId) => {
  const classData = await prisma.class.update({
    where: { id: classId },
    data: { teacherId },
    include: {
      teacher: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  return classData;
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  assignTeacher,
};
