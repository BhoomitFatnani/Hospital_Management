const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const { body } = require("express-validator");

const router = express.Router();

// Step 13: Add Input Validation for register route
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must contain at least 6 characters"),
  ],
  registerUser
);

// Step 8: Login route
router.post("/login", loginUser);

// Step 10: Protected profile route
router.get("/profile", protect, getProfile);

module.exports = router;
