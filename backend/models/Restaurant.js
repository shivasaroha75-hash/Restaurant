const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  cuisine: String,
  rating: Number,
  isOpen: { type: Boolean, default: true },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
