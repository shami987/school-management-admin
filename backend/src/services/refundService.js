const prisma = require('../config/database');

// Get all refund requests
const getAllRefunds = async (status) => {
  const where = status ? { status } : {};

  const refunds = await prisma.refundRequest.findMany({
    where,
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
          feeBalance: true,
        },
      },
    },
    orderBy: { requestedAt: 'desc' },
  });

  return refunds;
};

// Approve refund
const approveRefund = async (refundId, adminId, adminNotes) => {
  const refund = await prisma.refundRequest.findUnique({
    where: { id: refundId },
    include: {
      student: {
        include: {
          feeBalance: true,
        },
      },
    },
  });

  if (!refund) {
    throw new Error('Refund request not found');
  }

  if (refund.status !== 'PENDING') {
    throw new Error('Refund already processed');
  }

  // Check balance
  if (!refund.student.feeBalance || parseFloat(refund.student.feeBalance.balance) < parseFloat(refund.amount)) {
    throw new Error('Insufficient balance');
  }

  // Process refund in transaction
  const result = await prisma.$transaction(async (tx) => {
    // Update refund status
    const updatedRefund = await tx.refundRequest.update({
      where: { id: refundId },
      data: {
        status: 'APPROVED',
        processedAt: new Date(),
        processedBy: adminId,
        adminNotes: adminNotes || null,
      },
    });

    // Create withdrawal transaction
    await tx.feeTransaction.create({
      data: {
        studentId: refund.studentId,
        type: 'WITHDRAW',
        amount: refund.amount,
        description: `Refund approved: ${refund.reason}`,
      },
    });

    // Update balance
    await tx.feeBalance.update({
      where: { studentId: refund.studentId },
      data: {
        balance: {
          decrement: refund.amount,
        },
      },
    });

    return updatedRefund;
  });

  return result;
};

// Reject refund
const rejectRefund = async (refundId, adminId, adminNotes) => {
  const refund = await prisma.refundRequest.findUnique({
    where: { id: refundId },
  });

  if (!refund) {
    throw new Error('Refund request not found');
  }

  if (refund.status !== 'PENDING') {
    throw new Error('Refund already processed');
  }

  const updatedRefund = await prisma.refundRequest.update({
    where: { id: refundId },
    data: {
      status: 'REJECTED',
      processedAt: new Date(),
      processedBy: adminId,
      adminNotes: adminNotes || 'Rejected by admin',
    },
  });

  return updatedRefund;
};

module.exports = {
  getAllRefunds,
  approveRefund,
  rejectRefund,
};
