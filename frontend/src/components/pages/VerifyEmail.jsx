import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/user/verifyEmail", {
        code: otp,
      });

      if (response.status === 200) {
        setMessage("Email verified successfully!");
        setMessageType("success");

        // Redirect to login after 3 seconds
        setTimeout(() => navigate("/home"), 3000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid or expired OTP");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-sm transform transition hover:scale-105 duration-300">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-orange-700">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter the OTP sent to your email.
        </p>

        {message && (
          <div
            className={`text-center text-sm mb-4 ${
              messageType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleVerify}>
          {/* OTP Input Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transform transition hover:scale-105 duration-300"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Redirect to Register */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Didn't receive the OTP?{" "}
          <a
            href="/register"
            className="text-orange-500 hover:underline transition duration-300"
          >
            Resend OTP
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
