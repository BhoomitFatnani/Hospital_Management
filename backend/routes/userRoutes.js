const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// 1. ACCESSIBLE TO USER + ADMIN
router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to the protected dashboard",
    user: req.user,
  });
});

// 2. ACCESSIBLE ONLY TO ADMIN
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin! You can access this page.",
  });
});

module.exports = router;