const deviceService = require('../services/deviceService');

// Get pending devices
const getPending = async (req, res, next) => {
  try {
    const devices = await deviceService.getPendingDevices();
    res.json({ devices });
  } catch (error) {
    next(error);
  }
};

// Get all devices
const getAll = async (req, res, next) => {
  try {
    const { status, userId } = req.query;
    const devices = await deviceService.getAllDevices({ status, userId });
    res.json({ devices });
  } catch (error) {
    next(error);
  }
};

// Verify device
const verify = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const adminId = req.user.userId;

    const device = await deviceService.verifyDevice(deviceId, adminId);

    res.json({
      message: 'Device verified successfully',
      device,
    });
  } catch (error) {
    next(error);
  }
};

// Reject device
const reject = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const adminId = req.user.userId;

    const device = await deviceService.rejectDevice(deviceId, adminId);

    res.json({
      message: 'Device rejected',
      device,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPending,
  getAll,
  verify,
  reject,
};
