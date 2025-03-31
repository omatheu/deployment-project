const express = require("express");
const userRoutes = require("./userRoutes");
const db = require("../database");

const router = express.Router();

// Test database connection
router.get("/test-db", async (req, res) => {
  try {
    await db.raw('SELECT 1');
    res.json({ message: "Database connection successful!" });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed!" });
  }
});

// Mount routes
router.use("/users", userRoutes);

// Health check route
router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = router; 