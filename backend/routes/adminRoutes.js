// Admin routes
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Define admin routes here
router.get("/polls", adminController.listAllPolls);

module.exports = router;
