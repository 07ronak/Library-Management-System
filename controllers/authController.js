const User = require("../models/User.js");
const Blacklist = require("../models/BlackList.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Helper function to extract token from request
const extractToken = (req) => {
  // Check Authorization header
  if (req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1];
    }
  }
  // Check cookies (if using cookie-based auth)
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }

  return null;
};

module.exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const user = new User({ username, password });
  await user.save();
  res
    .status(201)
    .json({ message: "User registered successfully with 'user' role" });
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: "No such user exists" });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
};

module.exports.logout = async (req, res) => {
  try {
    const token = extractToken(req);
    if (!token) return res.status(400).json({ error: "No token provided" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }

    const expiresAt = new Date(decoded.exp * 1000); // Convert JWT exp to Date

    // Check if token is already blacklisted to prevent duplicate entries
    const existingBlacklist = await Blacklist.findOne({ token });
    if (!existingBlacklist) {
      // Add token to blacklist only if it's not already there
      await Blacklist.create({ token, expiresAt });
    }

    res.clearCookie("token");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
};
