const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

let bucket = null;

// Initialize GridFS bucket
const initializeBucket = () => {
  if (!bucket && mongoose.connection.readyState === 1) {
    bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'images'
    });
  }
  return bucket;
};

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

// Static method to upload image
imageSchema.statics.uploadImage = async function(fileBuffer, originalName, contentType, metadata = {}) {
  try {
    const bucket = initializeBucket();
    if (!bucket) {
      throw new Error('Database not connected');
    }

    const filename = `${Date.now()}-${originalName}`;
    
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        originalName,
        contentType,
        ...metadata
      }
    });

    return new Promise((resolve, reject) => {
      uploadStream.end(fileBuffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            _id: uploadStream.id,
            filename: uploadStream.filename,
            originalName,
            contentType,
            size: uploadStream.length,
            metadata: uploadStream.options.metadata
          });
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

// Static method to get image by ID
imageSchema.statics.getImageById = async function(imageId) {
  try {
    const bucket = initializeBucket();
    if (!bucket) {
      throw new Error('Database not connected');
    }

    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(imageId));
    return downloadStream;
  } catch (error) {
    throw error;
  }
};

// Static method to delete image by ID
imageSchema.statics.deleteImageById = async function(imageId) {
  try {
    const bucket = initializeBucket();
    if (!bucket) {
      throw new Error('Database not connected');
    }

    await bucket.delete(new mongoose.Types.ObjectId(imageId));
    return true;
  } catch (error) {
    throw error;
  }
};

const Image = mongoose.model('Image', imageSchema);

module.exports = { Image, initializeBucket }; 