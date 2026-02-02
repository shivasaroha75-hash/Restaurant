const express = require("express");
const router = express.Router();
const restaurantCtrl = require("../controllers/restaurantController");

router.get("/", restaurantCtrl.getRestaurants);
router.post("/", restaurantCtrl.createRestaurant);
router.put("/:id", restaurantCtrl.updateRestaurant);
router.delete("/:id", restaurantCtrl.deleteRestaurant);

module.exports = router;
