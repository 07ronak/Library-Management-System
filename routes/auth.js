const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();

router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));
router.post("/logout", logout);

module.exports = router;
