const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: Number,
  ingredients: [String],
  isAvailable: { type: Boolean, default: true },
});

menuItemSchema.index({ name: "text" }); // For search

module.exports = mongoose.model("MenuItem", menuItemSchema);
