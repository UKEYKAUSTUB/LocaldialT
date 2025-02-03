// models/User.js

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favoritecolor: {
      type: String, // Stores the user's answer to the question
      required: true, // Make this required if necessary
    },
    isVerified:{
      type:Boolean,
      default:false
  },
  resetPasswordToken:String,
  resetPasswordExpiresAt:Date,
  verficationToken:String,
  verficationTokenExpiresAt:Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
