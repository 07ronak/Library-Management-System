const express = require("express");
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
  particularBook,
} = require("../controllers/bookController");
const { authenticate, authorize } = require("../middleware/auth");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();

//SHOW and ADD route
router
  .route("/")
  .get(authenticate, wrapAsync(getBooks)) // All authenticated users
  .post(authenticate, authorize(["Admin"]), wrapAsync(addBook)); // Admin only

//UPDATE and DELETE route
router
  .route("/:id")
  .get(authenticate, wrapAsync(particularBook))
  .put(authenticate, authorize(["Admin", "Moderator"]), wrapAsync(updateBook)) // Admin and Moderator
  .delete(authenticate, authorize(["Admin"]), wrapAsync(deleteBook)); // Admin only

module.exports = router;
