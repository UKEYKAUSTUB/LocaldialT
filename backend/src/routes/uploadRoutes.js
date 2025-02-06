const express = require('express');
const {verifyToken}  =require ("../middlewares/authMiddleware.js")
const { upload, uploadFile, manualUpload } = require('../controllers/uploadController');


const uploadrouter = express.Router();

// Multer-based upload route
uploadrouter.post('/upload',verifyToken, upload.single('image'), uploadFile);

// Manual upload route using helper
uploadrouter.post('/manual-upload',verifyToken, upload.single('image'), manualUpload);

module.exports = uploadrouter;  