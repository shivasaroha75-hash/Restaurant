const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number, // snapshot price
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
      default: "Pending",
    },
    customerName: String,
    tableNumber: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
