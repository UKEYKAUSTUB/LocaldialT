const cloudinary = require('../models/cloudinaryConfig');

/**
 * Manually upload files to Cloudinary.
 * @param {string} filePath - Path of the file to upload.
 * @param {string} folder - Folder name in Cloudinary.
 * @returns {Promise<Object>} - Returns the Cloudinary upload response.
 */
const uploadToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto', // Automatically detect file type (image/video)
    });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

module.exports = { uploadToCloudinary };