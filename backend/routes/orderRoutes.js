const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

console.log("🔥 ORDER ROUTES LOADED");


router.get("/", orderController.getOrders);


router.post("/", orderController.createOrder);

router.patch("/:id/status", orderController.updateOrderStatus);


module.exports = router;
