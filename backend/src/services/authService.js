const prisma = require('../config/database');
const { comparePassword } = require('../utils/password');
const { generateToken } = require('../config/jwt');

// Admin/Teacher login
const loginUser = async (email, password, deviceId) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Only allow ADMIN and TEACHER roles
  if (user.role !== 'ADMIN' && user.role !== 'TEACHER') {
    throw new Error('Access denied');
  }

  // Verify password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Check device verification
  const device = await prisma.device.findUnique({
    where: {
      userId_deviceId: {
        userId: user.id,
        deviceId,
      },
    },
  });

  if (!device) {
    throw new Error('Device not registered');
  }

  if (device.status !== 'VERIFIED') {
    throw new Error('Device not verified');
  }

  // Generate JWT token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    deviceId,
  });

  return { user, token };
};

module.exports = {
  loginUser,
};
