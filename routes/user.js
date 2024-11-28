const express = require("express");
const {
  updateUserRole,
  getAllUsers,
} = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// Route to get all users (admin-only)
router.get("/", authenticate, authorize(["Admin"]), getAllUsers);

// Route to update user role (admin-only)
router.patch("/role", authenticate, authorize(["Admin"]), updateUserRole);

module.exports = router;
