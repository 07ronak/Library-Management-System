const mongoose = require("mongoose");
const books = require("./booksData");
const users = require("./usersData");
const Book = require("../models/Book.js");
const User = require("../models/User.js");

main()
  .then(() => {
    console.log(`connected to DB`);
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const initializeDB = async () => {
  try {
    await User.deleteMany(); // Delete existing users
    await Book.deleteMany({}); //Delete existing books

    await Book.insertMany(books); //insert books
    console.log("Books Data was added successfully");

    // Insert users into the database
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${user.username}`);
    }
  } catch (err) {
    console.error("Error seeding data:", err);
    mongoose.connection.close();
  }
};

initializeDB();
