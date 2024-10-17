const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // For logging requests
const app = express();
const adminRoutes = require("./Routes/adminRoutes");
const connectDB = require("./DataBase/database");
const authRoutes = require("./Routes/JobRoutes");
require("dotenv").config();

connectDB();

// Middleware
app.use(cors());
app.use(morgan("dev")); // Log requests to the console
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/admins", adminRoutes);
app.use("/api", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
