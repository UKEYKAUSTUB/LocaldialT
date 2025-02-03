const bcrypt = require("bcryptjs"); // Ensure bcrypt is imported
const { hashPassword } = require("../helpers/userHelper"); // Import helper function
const User = require("../models/user");
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const { sendVerificationEamil, senWelcomeEmail }=require ( "../middlewares/Email.js")
const {generateTokenAndSetCookies}  =require ("../middlewares/GenerateToken.js")

const registerUser = async (req, res) => {
  try {
    const { name, email, password, favoritecolor } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password || !favoritecolor) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, email, password, and favoritecolor",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);
    const verficationToken= Math.floor(100000 + Math.random() * 900000).toString()

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      favoritecolor,
      verficationToken,
      verficationTokenExpiresAt:Date.now() + 24 * 60 * 60 * 1000
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    generateTokenAndSetCookies(res,newUser._id)
       await sendVerificationEamil(newUser.email,verficationToken)

    // Send success response without returning sensitive data
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error("Error in user registration:", error);

    // Check for validation errors (e.g., missing or invalid fields)
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }

    // Handle other server errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const VerfiyEmail=async(req,res)=>{
  try {
      const {code}=req.body 
      const user= await User.findOne({
          verficationToken:code,
          verficationTokenExpiresAt:{$gt:Date.now()}
      })
      if (!user) {
          return res.status(400).json({success:false,message:"Inavlid or Expired Code"})
              
          }
        
   user.isVerified=true;
   user.verficationToken=undefined;
   user.verficationTokenExpiresAt=undefined;
   await user.save()
   await senWelcomeEmail(user.email,user.name)
   return res.status(200).json({success:true,message:"Email Verifed Successfully"})
         
  } catch (error) {
      console.log(error)
      return res.status(400).json({success:false,message:"internal server error"})
  }
}

// Login user (POST)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // Compare provided password with hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Respond with success message and token
    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // Include the token in the response
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Reset Password: Update password after verification (POST)
const resetPassword = async (req, res) => {
  
  try {
    const { email, securityAnswer, newPassword } = req.body;

    if (!email || !securityAnswer || !newPassword) {
      return res.status(400).json({
          success: false,
          message: "Email, security answer,new password are required",
      });
  }
  

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    // Verify the security answer
    if (user.favoritecolor !== securityAnswer) {
      return res.status(400).json({
          success: false,
          message: "Security answer is incorrect",
      });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the password
  user.password = hashedPassword;
  

  await user.save();

  return res.status(200).json({
      success: true,
      message: "Password reset successfully",
  });
} catch (error) {
  console.error(error, "Error resetting password");
  return res.status(500).json({
      success: false,
      message: "Internal server error",
  });
}
};


// Get user(s) data (GET)
const getUsers = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from request parameters (if provided)

    if (id) {
      // Fetch user by ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        user,
      });
    } else {
      // Fetch all users
      const users = await User.find();
      res.status(200).json({
        success: true,
        users,
      });
    }
  } catch (error) {
    console.error("Error in fetching user(s):", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Update an existing user (PUT)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from request parameters
    const { name, email, password } = req.body; // Extract data from request body

    // Check if the user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Hash the new password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await hashPassword(password);
    }

    // Update user details
    existingUser.name = name || existingUser.name;
    existingUser.email = email || existingUser.email;
    existingUser.password = hashedPassword || existingUser.password;

    // Save updated user to the database
    const updatedUser = await existingUser.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updating user:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Delete a user (DELETE)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from request parameters

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete the user
    await user.deleteOne();

    // Send success response
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting user:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = { registerUser,VerfiyEmail, loginUser, resetPassword, getUsers, updateUser, deleteUser };
