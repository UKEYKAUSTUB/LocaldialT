const express = require('express');
const { upload, uploadFile, manualUpload } = require('../controllers/uploadController');

const uploadrouter = express.Router();

// Multer-based upload route
uploadrouter.post('/upload', upload.single('image'), uploadFile);

// Manual upload route using helper
uploadrouter.post('/manual-upload', upload.single('image'), manualUpload);

module.exports = uploadrouter;