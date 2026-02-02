const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

console.log("🔥 MENU ROUTES LOADED");

// collection routes
router.route("/")
  .get(menuController.getMenu)
  .post(menuController.createMenuItem);

// search
router.get("/search", menuController.searchMenu);

// availability
router.patch("/:id/availability", menuController.toggleAvailability);

// id routes
router.route("/:id")
  .put(menuController.updateMenuItem)
  .delete(menuController.deleteMenuItem);

module.exports = router;
