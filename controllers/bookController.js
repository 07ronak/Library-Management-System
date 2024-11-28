const Book = require("../models/Book.js");

// Add a new book (Admin only)
module.exports.addBook = async (req, res) => {
  try {
    const { title, author, available } = req.body;
    // First, validate input
    if (!title || !author) {
      return res.status(400).json({
        message: "Title and author are required",
      });
    }
    const newBook = new Book({ title, author, available });
    const savedBook = await newBook.save();

    console.log("Book saved successfully:", savedBook);

    res.status(201).json({
      message: "Book added successfully",
      newBook: savedBook,
    });
  } catch (error) {
    console.error("Error saving book:", error);
    res.status(500).json({
      message: "Error adding book",
      error: error.message,
    });
  }
};

// Get all books (All authenticated users)
module.exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

//show particular book
module.exports.particularBook = async (req, res) => {
  let { id } = req.params;
  const particularBook = await Book.findById(id);
  // Check if the book exists
  if (!particularBook) {
    return next(new ExpressError("Book not found", 404));
  }
  // Send the book details in the response
  res.status(200).json({
    success: true,
    data: particularBook,
  });
};

// Update a book (Admin and Moderator)
module.exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const book = await Book.findByIdAndUpdate(
    id,
    { title, author },
    { new: true }
  );
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json({ message: "Book updated successfully", book });
};

// Delete a book (Admin only)
module.exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndDelete(id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json({ message: "Book deleted successfully" });
};
