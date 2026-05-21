const Order = require('../models/Order');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const orders = await Order.find({});
    
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
    const completedOrders = orders.filter((o) => o.status === 'Completed').length;
    
    const totalRevenue = orders
      .filter((o) => o.status === 'Completed')
      .reduce((acc, order) => acc + order.totalAmount, 0);

    const recentOrders = await Order.find({ status: { $ne: 'Completed' } })
      .sort({ createdAt: 1 })
      .populate('user', 'name')
      .populate('items.menuItem', 'name');

    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      revenue: totalRevenue,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats };
