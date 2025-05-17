// User info route for /api/user
const express = require("express");
const router = express.Router();

// For demo/dev, return a mock user. Replace with real auth in production.
router.get("/", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json(req.user);
});

module.exports = router;
