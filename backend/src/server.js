// Entry point for the backend server
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const pollRoutes = require(path.join(__dirname, "../routes/pollRoutes"));
const adminRoutes = require(path.join(__dirname, "../routes/adminRoutes"));
const authMiddleware = require(path.join(
  __dirname,
  "../middleware/authMiddleware"
));

// Load environment variables
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

// Authentication middleware
app.use(authMiddleware);

// API routes
app.use("/api/polls", pollRoutes);
app.use("/api/admin", adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
