const dashboardService = require('../services/dashboardService');

// Get dashboard stats
const getStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.json({ stats });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
};
