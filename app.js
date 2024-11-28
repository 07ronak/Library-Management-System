const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const ExpressError = require("./utils/ExpressError");
/* const session = require("express-session"); */

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
    console.log(`Database Name: ${mongoose.connection.db.databaseName}`);
    console.log(`Collections ${Object.keys(mongoose.connection.collections)}`);
  })
  .catch((err) => console.error(err));

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ Lost MongoDB connection");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 Reconnected to MongoDB");
});

// Default route
app.get("/", (req, res) => res.send("Library Management System is running!"));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
/* app.use("/api/books/:id/review", reviewRoutes); */

//For all other routes request [NO SUCH PAGE EXISTS]
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not found"));
});

//Error-Handling-Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong" } = err;
  /* res.status(status).send(message); */
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
