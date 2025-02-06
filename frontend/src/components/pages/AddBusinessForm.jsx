import React, { useState } from "react";
import axios from "axios";

const AddBusinessForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // ✅ Image URL input
  const [imageFile, setImageFile] = useState(null); // ✅ Image file input
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle File Change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Set file object
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !description || (!imageUrl && !imageFile) || !category) {
      setError("All fields are required. Provide an image URL or upload a file.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated. Please log in.");
      }
  
      const formData = new FormData(); // ✅ FormData to send files
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
  
      if (imageFile) {
        formData.append("image", imageFile); // ✅ Append file
      } else {
        formData.append("imageUrl", imageUrl); // ✅ Append URL if no file
      }
  
      const response = await axios.post("http://localhost:4000/api/businesses", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // ✅ Important for file upload
        },
      });
  
      alert("Service uploaded successfully!");
      setName("");
      setDescription("");
      setImageUrl("");
      setImageFile(null);
      setCategory("");
       // ✅ Reset file input field
       document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload service. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-sm transform transition hover:scale-105 duration-300">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-orange-700">
          Add Your Business
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Provide details to list your business.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Business Name */}
          <input type="text" placeholder="Business Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required />

          {/* Description */}
          <textarea placeholder="Describe your business" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 border rounded-lg" rows="4" required />

          {/* ✅ Image URL Input */}
          <input type="text" placeholder="Enter Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-3 border rounded-lg" />

           {/* 🔥 OR Label */}
           <div className="text-center font-bold text-gray-500 my-2">— OR —</div>

          {/* ✅ Image File Upload */}
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full px-4 py-3 border rounded-lg" />

          {/* Category Selection */}
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required>
            <option value="">Select a category</option>
            <option value="Grocery Shops">Grocery Shops</option>
            <option value="Hospitals">Hospitals</option>
            <option value="Gyms">Gyms</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Hotels">Hotels</option>
            <option value="Pharmacies">Pharmacies</option>
          </select>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBusinessForm;
