require("dotenv").config(); // Load environment variables from .env

const express = require("express"); // Import Express framework
const bodyParser = require("body-parser"); // Parse JSON bodies
const cors = require("cors"); // Handle CORS (cross-origin requests)
const connectDB = require("./config/db"); // MongoDB connection function
const cookieParser = require("cookie-parser"); // Parse cookies from requests

// Import all route files
const voterRoutes = require("./routes/voterRoutes");
const adminRoutes = require("./routes/adminRoutes");
const voteRoutes = require("./routes/voteRoutes");
const voteResults = require("./routes/voteResults");
const authRoutes = require("./routes/authRoutes");
const voterStats = require("./routes/voterStats");

const app = express(); // Create Express app
connectDB(); // Connect to MongoDB

const FRONTEND_URL = "http://localhost:5173"; // React frontend origin

// Enable CORS and allow frontend to send credentials (like cookies)
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Middleware to parse incoming requests
app.use(bodyParser.json()); // Parses JSON body (can be replaced with express.json())
app.use(express.json()); // Built-in JSON parser
app.use(cookieParser()); // Allows access to cookies

// Route handling
app.use("/api/voter", voterRoutes); // Handles voter-related routes
app.use("/api/admin", adminRoutes); // Handles admin-related routes
app.use("/api/vote", voteRoutes); // Handles vote submission
app.use("/api/results", voteResults); // Handles vote result fetching
app.use("/api/authcheck", authRoutes); // Handles token/cookie authentication
app.use("/api/voterStats", voterStats) // Handles fetching voter statistics


// Start the server on defined port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
