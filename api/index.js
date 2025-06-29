require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectWithDB } = require("./config/db");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const { initializeBucket } = require("./models/Image");
const path = require('path');

// connect with database
connectWithDB().then(() => {
  // Initialize GridFS bucket after database connection
  initializeBucket();
});

// cloudinary configuration with error handling
try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("Cloudinary configured successfully");
} catch (error) {
  console.log("Cloudinary configuration failed:", error.message);
  console.log("Image upload features will be disabled");
}

const app = express();

// For handling cookies
app.use(cookieParser());

// Initialize cookie-session middleware
app.use(
  cookieSession({
    name: "session",
    maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
    secure: true, // Only send over HTTPS
    sameSite: "none", // Allow cross-origin requests
    httpOnly: true, // Makes the cookie accessible only on the server-side
  })
);

// middleware to handle json
app.use(express.json());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// use express router
app.use("/", require("./routes"));
app.use("/api/images", require("./routes/images"));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectWithDB();
    console.log('DB connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port no. ${PORT}`);
    });
  } catch (error) {
    console.log('Error starting server:', error);
  }
};

startServer();

module.exports = app;
