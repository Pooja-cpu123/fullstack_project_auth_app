const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

// Connect to the database
connectDB();

// Initialize the Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Test route to verify the server is running
app.get("/", (req, res) => {
    res.send("Hello World!!!");
});

// Import and use routes (e.g., user routes)
const userRoutes = require("./routes/userRoutes");
app.use("/api/v1/users", userRoutes);

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});