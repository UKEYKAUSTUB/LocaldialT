const Business = require('../models/business');

// Get all businesses
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json({
      success: true,
      message: "Businesses fetched successfully",
      businesses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get business by ID
const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      });
    }
    res.status(200).json({
      success: true,
      message: "Business fetched successfully",
      business,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a business
const createBusiness = async (req, res) => {
  try {
    console.log("🔥 Request body:", req.body); // ✅ Debugging
    console.log("🔥 File:", req.file); // ✅ Debugging

    const { name, description, category, imageUrl } = req.body; // ✅ Get imageUrl if provided
    let image;

    if (req.file) {
      image = req.file.path; // ✅ If file is uploaded, use its path
    } else if (imageUrl) {
      image = imageUrl; // ✅ Otherwise, use provided image URL
    } else {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const newBusiness = new Business({ name, description, image, category });
    const savedBusiness = await newBusiness.save();
    res.status(201).json({
      success: true,
      message: "Business created successfully",
      business: savedBusiness,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a business
const updateBusiness = async (req, res) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBusiness) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      });
    }
    res.status(200).json({
      success: true,
      message: "Business updated successfully",
      business: updatedBusiness,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a business
const deleteBusiness = async (req, res) => {
  try {
    const deletedBusiness = await Business.findByIdAndDelete(req.params.id);
    if (!deletedBusiness) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      });
    }
    res.status(200).json({
      success: true,
      message: "Business deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
