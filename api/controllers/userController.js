const User = require('../models/User');
const cookieToken = require('../utils/cookieToken');
const bcrypt = require('bcryptjs')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { Image } = require('../models/Image');


// Register/SignUp user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      });
    }

    // check if user is already registered
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: 'User already registered!',
      });
    }

    user = await User.create({
      name,
      email,
      password,
    });

    // after creating new user in DB send the token
    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

// Login/SignIn user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check for presence of email and password
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required!',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'User does not exist!',
      });
    }

    // match the password
    const isPasswordCorrect = await user.isValidatedPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Email or password is incorrect!',
      });
    }

    // if everything is fine we will send the token
    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

// Google Login
exports.googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400), json({
        message: 'Name and email are required'
      })
    }

    // check if user already registered
    let user = await User.findOne({ email });

    // If the user does not exist, create a new user in the DB  
    if (!user) {
      user = await User.create({
        name,
        email,
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10)
      })
    }

    // send the token
    cookieToken(user, res)
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
}

// Upload picture
exports.uploadPicture = async (req, res) => {
  try {
    const { path, originalname, mimetype } = req.file;
    
    // Read file buffer
    const fileBuffer = fs.readFileSync(path);
    
    // Upload to database
    const imageData = await Image.uploadImage(
      fileBuffer,
      originalname,
      mimetype,
      { source: 'profile', userId: req.user.id }
    );

    // Create serving URL
    const imageUrl = `${process.env.API_URL || 'http://localhost:8000'}/api/images/${imageData._id}`;
    
    // Clean up temporary file
    fs.unlinkSync(path);
    
    res.status(200).json(imageUrl);
  } catch (error) {
    console.log('Image upload error:', error);
    res.status(500).json({
      message: 'Image upload failed. Please try again later.',
    });
  }
};

// update user
exports.updateUserDetails = async (req, res) => {
  try {
    const { name, password, email, picture } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404), json({
        message: 'User not found'
      })
    }

    // user can update only name, only password,only profile pic or all three

    user.name = name
    if (picture && !password) {
      user.picture = picture
    } else if (password && !picture) {
      user.password = password
    } else {
      user.picture = picture
      user.password = password
    }
    const updatedUser = await user.save()
    cookieToken(updatedUser, res)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }, error)
  }
}

// Logout
exports.logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,   // Only send over HTTPS
    sameSite: 'none' // Allow cross-origin requests
  });
  res.status(200).json({
    success: true,
    message: 'Logged out',
  });
};
