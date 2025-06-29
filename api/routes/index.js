const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const fetch = require('node-fetch');
const { Image } = require('../models/Image');

// multer
const upload = multer({ dest: '/tmp' });

router.get('/', (req, res) => {
  res.status(200).json({
    greeting: 'Hello from StayInn API',
  });
});

// Health check route for Railway
router.get('/api', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'StayInn API is running',
    timestamp: new Date().toISOString()
  });
});

// upload photo using image url
router.post('/upload-by-link', async (req, res) => {
  try {
    const { link } = req.body;
    
    // Download image from URL
    const response = await fetch(link);
    if (!response.ok) {
      return res.status(400).json({
        message: 'Failed to download image from URL',
      });
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const originalName = `image-${Date.now()}.jpg`;

    // Upload to database
    const imageData = await Image.uploadImage(
      Buffer.from(buffer),
      originalName,
      contentType,
      { source: 'url', originalUrl: link }
    );

    // Return the image ID and serving URL
    const imageUrl = `${process.env.API_URL || 'http://localhost:8000'}/api/images/${imageData._id}`;
    
    res.json(imageUrl);
  } catch (error) {
    console.log('Image upload error:', error);
    res.status(500).json({
      message: 'Image upload failed. Please try again later.',
    });
  }
});

// upload images from local device
router.post('/upload', upload.array('photos', 100), async (req, res) => {
  try {
    let imageArray = [];

    for (let index = 0; index < req.files.length; index++) {
      const { path, originalname, mimetype } = req.files[index];
      
      // Read file buffer
      const fileBuffer = fs.readFileSync(path);
      
      // Upload to database
      const imageData = await Image.uploadImage(
        fileBuffer,
        originalname,
        mimetype,
        { source: 'file' }
      );

      // Create serving URL
      const imageUrl = `${process.env.API_URL || 'http://localhost:8000'}/api/images/${imageData._id}`;
      imageArray.push(imageUrl);

      // Clean up temporary file
      fs.unlinkSync(path);
    }

    res.status(200).json(imageArray);
  } catch (error) {
    console.log('Image upload error:', error);
    res.status(500).json({
      message: 'Image upload failed. Please try again later.',
    });
  }
});

router.use('/user', require('./user'));
router.use('/places', require('./place'));
router.use('/bookings', require('./booking'));
router.use('/admin', require('./admin'));

module.exports = router;
