const { CloudinaryStorage } = require('multer-storage-cloudinary');

const multer = require('multer');
const { uploadToCloudinary } = require('../helpers/uploadHelper');
const cloudinary = require('../models/cloudinaryConfig');

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'image',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// Controller to handle file upload with multer
const uploadFile = (req, res) => {
  if (req.file) {
    res.status(200).json({
      message: 'File uploaded successfully',
      url: req.file.path,
    });
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
};

// Controller to handle manual upload using helper
const manualUpload = async (req, res) => {
  try {
    const { path } = req.file; // Assuming multer uploads to a temp directory
    const result = await uploadToCloudinary(path, 'image');
    res.status(200).json({
      message: 'File uploaded successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { upload, uploadFile, manualUpload };