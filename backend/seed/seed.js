const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Restaurant = require("../models/Restaurant");
const MenuItem = require("../models/MenuItem");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding ✅"))
  .catch((err) => console.log(err));

const seed = async () => {
  await Restaurant.deleteMany();
  await MenuItem.deleteMany();

  await Restaurant.insertMany([
    { name: "Spice Villa", location: "Noida", cuisine: "Indian", rating: 4.2 },
    { name: "Pasta Point", location: "Delhi", cuisine: "Italian", rating: 4.5 },
  ]);

  await MenuItem.insertMany([
    { name: "Paneer Butter Masala", category: "Main", price: 250, ingredients: ["Paneer", "Butter"], isAvailable: true },
    { name: "Margherita Pizza", category: "Main", price: 300, ingredients: ["Cheese", "Tomato"], isAvailable: true },
    { name: "Cold Coffee", category: "Beverage", price: 99, ingredients: ["Milk", "Coffee"], isAvailable: true },
  ]);

  console.log("Dummy data inserted successfully 🎉");
  process.exit();
};

seed();
