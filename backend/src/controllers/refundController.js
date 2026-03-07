const refundService = require('../services/refundService');

// Get all refunds
const getAll = async (req, res, next) => {
  try {
    const { status } = req.query;
    const refunds = await refundService.getAllRefunds(status);
    res.json({ refunds });
  } catch (error) {
    next(error);
  }
};

// Approve refund
const approve = async (req, res, next) => {
  try {
    const { refundId } = req.params;
    const { adminNotes } = req.body;
    const adminId = req.user.userId;

    const refund = await refundService.approveRefund(refundId, adminId, adminNotes);

    res.json({
      message: 'Refund approved successfully',
      refund,
    });
  } catch (error) {
    next(error);
  }
};

// Reject refund
const reject = async (req, res, next) => {
  try {
    const { refundId } = req.params;
    const { adminNotes } = req.body;
    const adminId = req.user.userId;

    const refund = await refundService.rejectRefund(refundId, adminId, adminNotes);

    res.json({
      message: 'Refund rejected',
      refund,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  approve,
  reject,
};
