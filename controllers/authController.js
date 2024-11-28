const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  const { username, password } = req.body;
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

module.exports.logout = (req, res) => {
  // For cookies: Clear the token by setting it to an empty value with an immediate expiry.
  res.cookie("token", "", { maxAge: 1, httpOnly: true });

  res.status(200).json({ message: "Logout successful" });
};
