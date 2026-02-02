const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

/* =========================
   CREATE ORDER
========================= */
exports.createOrder = async (req, res) => {
  try {
    const { items, customerName, tableNumber } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items required" });
    }

    let totalAmount = 0;
    const populatedItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);

      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      const itemTotal = menuItem.price * item.quantity;
      totalAmount += itemTotal;

      populatedItems.push({
        menuItem: menuItem._id,
        quantity: item.quantity,
        price: menuItem.price, // snapshot price
      });
    }

    const order = await Order.create({
      items: populatedItems,
      totalAmount,
      customerName,
      tableNumber,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET ALL ORDERS
========================= */
exports.getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 5 } = req.query;

    const query = status ? { status } : {};

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET SINGLE ORDER
========================= */
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.menuItem"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE ORDER STATUS
========================= */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


