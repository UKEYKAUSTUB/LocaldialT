const express = require("express");
const cors = require("cors"); // Import the cors package
const authRoutes = require("./routes/userRoutes"); // Import the auth routes
const businessRoutes = require('./routes/businessRoutes');
const uploadrouter = require("./routes/uploadRoutes.js");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Allow multiple origins for CORS
app.use(cors());

app.use(express.json()); // To parse incoming JSON requests

// MongoDB connection
connectDB();

// Use the authentication routes
app.use("/api/user", authRoutes); // Prefix the routes with /api/user
app.use('/api/businesses', businessRoutes);
app.use('/api/img', uploadrouter);
// Root route to verify server is working
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, (error) => {
  if (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
  console.log(`Server running at http://localhost:${port}`);
});



