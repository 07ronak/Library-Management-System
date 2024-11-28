const User = require("../models/User");
const mongoose = require("mongoose");

module.exports.updateUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    // Validate input
    if (!userId || !newRole) {
      return res.status(400).json({
        success: false,
        message: "User ID and new role are required",
      });
    }

    // Validate that the user ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Validate role
    const validRoles = ["Admin", "Moderator", "User"];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be one of: Admin, Moderator, User",
      });
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true } // Return the updated document
    );

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Respond with success and updated user info (excluding password)
    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Role update error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users, excluding password field
    const users = await User.find({}, { password: 0 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch users",
      error: error.message,
    });
  }
};
