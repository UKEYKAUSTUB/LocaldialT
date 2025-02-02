import React, { useState } from "react";
import { addServices } from "../apiCalls";

const AddBusinessForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !image || !category) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image); // File
    formData.append("category", category);

    try {
      const response = await addServices(formData); // API call to add service

      if (response.success) {
        alert("Service uploaded successfully!");
        setName("");
        setDescription("");
        setImage(null);
        setCategory("");
      } else {
        throw new Error(response.message || "Service upload failed.");
      }
    } catch (err) {
      setError("Error during service upload. Please try again.");
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
          {/* Business Name Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Business Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          {/* Description Field */}
          <div className="relative">
            <textarea
              placeholder="Describe your business"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-800 placeholder-gray-400"
              rows="4"
              required
            />
          </div>

          {/* Image Upload Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          {/* Category Selection Field */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-800 placeholder-gray-400"
              required
            >
              <option value="">Select a category</option>
              <option value="Grocery Shops">Grocery Shops</option>
              <option value="Hospitals">Hospitals</option>
              <option value="Gyms">Gyms</option>
              <option value="Restaurants">Restaurants</option>
              <option value="Hotels">Hotels</option>
              <option value="Pharmacies">Pharmacies</option>
            </select>
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
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBusinessForm;
