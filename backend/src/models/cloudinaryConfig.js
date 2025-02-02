const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dw3olyho7', // Replace with your Cloudinary cloud name
  api_key: '428424463293479', // Replace with your API key
  api_secret: 'G6Ybc6aeoggvokkFehfLFIKlHmc', // Replace with your API secret
});

module.exports = cloudinary;