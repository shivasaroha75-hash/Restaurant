const express = require("express");
const router = express.Router();
const dashboardCtrl = require("../controllers/dashboardController");

router.get("/stats", dashboardCtrl.getStats);

module.exports = router;
