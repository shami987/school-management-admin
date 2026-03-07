const prisma = require('../config/database');

// Get all pending devices
const getPendingDevices = async () => {
  const devices = await prisma.device.findMany({
    where: { status: 'PENDING' },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return devices;
};

// Get all devices with optional filters
const getAllDevices = async (filters = {}) => {
  const where = {};
  
  if (filters.status) where.status = filters.status;
  if (filters.userId) where.userId = filters.userId;

  const devices = await prisma.device.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return devices;
};

// Verify device
const verifyDevice = async (deviceId, adminId) => {
  const device = await prisma.device.findUnique({
    where: { id: deviceId },
  });

  if (!device) {
    throw new Error('Device not found');
  }

  if (device.status === 'VERIFIED') {
    throw new Error('Device already verified');
  }

  const updatedDevice = await prisma.device.update({
    where: { id: deviceId },
    data: {
      status: 'VERIFIED',
      verifiedAt: new Date(),
      verifiedBy: adminId,
    },
  });

  return updatedDevice;
};

// Reject device
const rejectDevice = async (deviceId, adminId) => {
  const device = await prisma.device.findUnique({
    where: { id: deviceId },
  });

  if (!device) {
    throw new Error('Device not found');
  }

  const updatedDevice = await prisma.device.update({
    where: { id: deviceId },
    data: {
      status: 'REJECTED',
      verifiedBy: adminId,
    },
  });

  return updatedDevice;
};

module.exports = {
  getPendingDevices,
  getAllDevices,
  verifyDevice,
  rejectDevice,
};
