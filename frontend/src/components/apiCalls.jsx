import axios from "axios";
import { API_PROUDCT_URL, LOGIN_URL, REGISTER_URL, Verification_URL, RESET_PASSWORD_URL } from "../endPoint";

// Axios instance with timeout and default headers
const axiosInstance = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Register User API Call
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(REGISTER_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};


export const VerifyUser = async (verificationCode) => {
  try {
    const response = await axiosInstance.post(Verification_URL, { code: verificationCode });
    return response.data;
  } catch (error) {
    console.error("Error during Verification:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Verification failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};


// Login User API Call
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post(LOGIN_URL, userData);

    if (response.data.success && response.data.token) {
      localStorage.setItem("token", response.data.token); // Store token in localStorage
    } else {
      throw new Error(response.data.message || "Login failed");
    }

    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

// Reset Password API Call
export const resetPassword = async (resetData) => {
  try {
    const response = await axiosInstance.post(RESET_PASSWORD_URL, resetData);
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Password reset failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

//API Call for the services(post)
export const addServices = async (formData) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated. Please log in.");
    }
       // ✅ Debugging: Print FormData before sending
       for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

    // Set Authorization header
    const response = await axiosInstance.post(API_PROUDCT_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in headers
        "Content-Type": "multipart/form-data", // Required for formData
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error during service uploding:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Service upload failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

//API Call for the services(get )
export const fetchServices = async () => {
  try {
    const response = await axiosInstance.get(API_PROUDCT_URL); // Use variable, not string
    console.log("API Response:", response.data);
    return response.data.businesses || response.data; // Adjust based on API response
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch services");
  }
};
//image uploading
const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post(API_IMAGE_UPLOAD_URL, formData);
    console.log("Uploaded file URL:", response.data.url);
    return response.data.url; // Use this URL to display the image or save in the database
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("File upload failed");
  }
};
