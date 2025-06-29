const { connectWithDB } = require('../config/db');
const { Image, initializeBucket } = require('../models/Image');
const fs = require('fs');
const path = require('path');

const addDefaultAvatar = async () => {
  try {
    // Connect to database
    await connectWithDB();
    
    // Initialize GridFS
    initializeBucket();
    
    // Check if default avatar already exists
    const existingAvatar = await Image.findOne({ filename: 'default-avatar' });
    if (existingAvatar) {
      console.log('Default avatar already exists');
      return;
    }
    
    // Create a simple default avatar (you can replace this with an actual image file)
    const defaultAvatarBuffer = Buffer.from(`
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#e5e7eb"/>
        <circle cx="50" cy="35" r="15" fill="#9ca3af"/>
        <path d="M 20 80 Q 50 60 80 80" stroke="#9ca3af" stroke-width="8" fill="none"/>
      </svg>
    `);
    
    // Upload default avatar
    const imageData = await Image.uploadImage(
      defaultAvatarBuffer,
      'default-avatar.svg',
      'image/svg+xml',
      { source: 'default', type: 'avatar' }
    );
    
    console.log('Default avatar added successfully:', imageData._id);
    
  } catch (error) {
    console.error('Error adding default avatar:', error);
  } finally {
    process.exit(0);
  }
};

addDefaultAvatar(); 