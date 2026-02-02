const Restaurant = require("../models/Restaurant");
const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");

exports.getStats = async (req, res) => {
  try {
    const totalRestaurants = await Restaurant.countDocuments();
    const totalMenuItems = await MenuItem.countDocuments();

    const totalOrders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      revenueAgg.length > 0 ? revenueAgg[0].totalRevenue : 0;

    res.json({
      totalRestaurants,
      totalMenuItems,
      totalOrders,
      totalRevenue,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Dashboard stats error" });
  }
};
