const users = [
  {
    username: "admin_user",
    email: "admin@example.com",
    password: "admin123", // Password will be hashed
    role: "Admin",
  },
  {
    username: "moderator_user",
    email: "moderator@example.com",
    password: "moderator123", // Password will be hashed
    role: "Moderator",
  },
  {
    username: "regular_user",
    email: "user@example.com",
    password: "user123", // Password will be hashed
    role: "User",
  },
];

module.exports = users;
