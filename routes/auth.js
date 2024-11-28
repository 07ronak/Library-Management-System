const express = require("express");
const rateLimit = require("express-rate-limit");
const { register, login, logout } = require("../controllers/authController");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();

// Create a rate limiter specifically for login attempts
const loginLimiter = rateLimit({
  // Maximum number of login attempts from a single IP
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    status: 429,
    message: "Too many login attempts. Please try again later.",
  },
  // headers to show rate limit information
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post("/register", wrapAsync(register));
router.post("/login", loginLimiter, wrapAsync(login));
router.post("/logout", wrapAsync(logout));

module.exports = router;
