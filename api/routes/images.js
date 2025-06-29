const express = require('express');
const router = express.Router();
const { Image } = require('../models/Image');

// Serve image by ID
router.get('/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    
    if (!imageId) {
      return res.status(400).json({ message: 'Image ID is required' });
    }

    // Handle default avatar
    if (imageId === 'default-avatar') {
      // Find the default avatar in the database
      const defaultAvatar = await Image.findOne({ filename: 'default-avatar' });
      if (!defaultAvatar) {
        return res.status(404).json({ message: 'Default avatar not found' });
      }
      
      const downloadStream = await Image.getImageById(defaultAvatar._id);
      downloadStream.on('data', (chunk) => {
        res.write(chunk);
      });

      downloadStream.on('end', () => {
        res.end();
      });

      downloadStream.on('error', (error) => {
        console.error('Error streaming default avatar:', error);
        res.status(404).json({ message: 'Default avatar not found' });
      });
      return;
    }

    const downloadStream = await Image.getImageById(imageId);
    
    // Set appropriate headers
    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('end', () => {
      res.end();
    });

    downloadStream.on('error', (error) => {
      console.error('Error streaming image:', error);
      res.status(404).json({ message: 'Image not found' });
    });

  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({ message: 'Error serving image' });
  }
});

// Delete image by ID
router.delete('/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    
    if (!imageId) {
      return res.status(400).json({ message: 'Image ID is required' });
    }

    // Prevent deletion of default avatar
    if (imageId === 'default-avatar') {
      return res.status(403).json({ message: 'Cannot delete default avatar' });
    }

    await Image.deleteImageById(imageId);
    res.status(200).json({ message: 'Image deleted successfully' });

  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image' });
  }
});

module.exports = router; 