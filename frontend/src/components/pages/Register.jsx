import React, { useState } from "react";
import { registerUser } from "../apiCalls"; // Import the API call function
import {useNavigate} from "react-router-dom"
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favoritecolor, setFavoritecolor] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !favoritecolor) {
      setError("All fields are required.");
      return;
    }

    const userData = { name, email, password, favoritecolor };

    try {
      setLoading(true);
      setError("");

      const response = await registerUser(userData); // API call to register user

      if (response.success) {
        alert("Please verify your email.");
        navigate("/verifyEmail")
      } 
      else {
        setError(response.message || "Registration failed.");
      }
    } catch (err) {
      setError("Error during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div
        className="p-8 rounded-xl shadow-lg w-full max-w-sm transform transition hover:scale-105 duration-300"
      >
        <h2 className="text-2xl font-extrabold mb-6 text-center text-orange-700">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sign up to access exclusive features.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          {/* Favorite Color Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Favorite Color"
              value={favoritecolor}
              onChange={(e) => setFavoritecolor(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          {/* Display Error */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transform transition hover:scale-105 duration-300"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-orange-500 hover:underline transition duration-300"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
