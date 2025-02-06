const express = require('express');
const {verifyToken}  =require ("../middlewares/authMiddleware.js")
const {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
} = require('../controllers/businessController');
const { upload } = require('../controllers/uploadController');

const router = express.Router();

// Routes for Business
router.get('/', getAllBusinesses);
router.get('/:id', getBusinessById);
router.post('/', verifyToken, upload.single("image")   , (req, res, next) => {
  console.log("🔥 /api/businesses route hit!");
  next(); // Pass control to the actual controller
}, createBusiness);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);


module.exports = router;
