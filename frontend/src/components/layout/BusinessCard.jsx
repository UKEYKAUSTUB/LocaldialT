import React from "react";

const BusinessCard = ({ name, description, image, category, onViewDetails }) => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      <div className="relative w-full h-40 bg-gray-100">
        <img
          className="absolute inset-0 w-full h-full object-contain"
          src={image}
          alt={`${name || "Business"} Image`}
          onError={(e) => (e.target.src = "fallback_image_url.jpg")} // Fallback image
        />
      </div>
      <div className="p-2">
        {/* Business Name - Centered and without background */}
        <h3
          className={`text-lg font-bold text-black text-center`}
        >
          {name || "No Name Provided"}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{description || "No description available."}</p>
        <div className="text-sm text-gray-500 mt-2 flex justify-between items-center">
          <span className="inline-block bg-gray-200 px-2 py-1 rounded-full text-xs font-medium">
            {category || "Uncategorized"}
          </span>
          {/* View Details Button */}
          <button
            onClick={onViewDetails}
            className="text-blue-500 hover:underline text-xs font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
