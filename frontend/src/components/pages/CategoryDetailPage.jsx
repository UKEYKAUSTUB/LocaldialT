import React from "react";
import { useParams } from "react-router-dom";

const CategoryDetailPage = () => {
  const { category } = useParams(); // Get the category from the URL

  // Example data for all categories
  const categoriesData = {
    hospitals: [
      {
        id: 1,
        name: "Harsh Maternity & Gynaec Hospital",
        rating: 4.2,
        ratingsCount: 70,
        location: "Boisar Tarapur Road, Boisar, Palghar",
        tags: ["Diseases In Pregnancy", "Obstetrics Problems"],
        phone: "09845161450",
        image: "/src/assets/images/hos1.jpg",
      },
      {
        id: 2,
        name: "City General Hospital",
        rating: 4.5,
        ratingsCount: 120,
        location: "City Center, Mumbai",
        tags: ["Emergency Services", "Specialist Doctors"],
        phone: "09845161451",
        image: "/src/assets/images/hos2.jpg",
      },
    ],
    "grocery-shops": [
      {
        id: 1,
        name: "Fresh Mart",
        rating: 4.3,
        ratingsCount: 50,
        location: "Market Street, City Center",
        tags: ["Fresh Produce", "Daily Essentials"],
        phone: "09845161453",
        image: "/src/assets/images/grocery1.jpg",
      },
      {
        id: 2,
        name: "Green Groceries",
        rating: 4.5,
        ratingsCount: 80,
        location: "Highway Road, Suburbs",
        tags: ["Organic Vegetables", "Exotic Fruits"],
        phone: "09845161454",
        image: "/src/assets/images/grocery1.jpg",
      },
    ],
    gyms: [
      {
        id: 1,
        name: "Iron Paradise",
        rating: 4.7,
        ratingsCount: 110,
        location: "Fitness Lane, Downtown",
        tags: ["Weight Training", "Cardio Machines"],
        phone: "09845161455",
        image: "/src/assets/images/gym1.jpg",
      },
    ],
  };

  // Fetch the category data dynamically
  const categoryData = categoriesData[category.toLowerCase()] || [];

  // Handle category not found
  if (categoryData.length === 0) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-4xl font-bold">Category Not Found</h1>
        <p className="text-lg mt-4">
          Sorry, we couldn’t find any data for the category: {category}.
        </p>
      </div>
    );
  }

  // Render category cards dynamically
  const renderCategoryCards = () =>
    categoryData.map((item) => (
      <div
        key={item.id}
        className="bg-white shadow-lg rounded-lg p-6 mb-6 flex items-center gap-4"
      >
        {/* Image */}
        <img
          src={item.image}
          alt={item.name}
          className="w-40 h-40 object-cover rounded-lg"
        />
        {/* Details */}
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
          <div className="flex items-center text-green-600 font-medium my-2">
            <span className="text-2xl mr-2">{item.rating}</span>
            <span>{item.ratingsCount} Ratings</span>
          </div>
          <p className="text-gray-600">{item.location}</p>
          <div className="flex gap-2 mt-4">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-200 rounded-full text-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col items-end gap-2">
          <a
            href={`tel:${item.phone}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-green-600"
          >
            📞 {item.phone}
          </a>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg text-lg hover:bg-green-600">
            WhatsApp
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-600">
            Check Availability
          </button>
        </div>
      </div>
    ));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-semibold mb-6 text-black-900 capitalize">
        {category.replace("-", " ")}
      </h1>
      <p className="text-lg mb-8">
        Discover the best {category.replace("-", " ")} in your area. We provide
        a list of trusted providers to ensure your needs are met.
      </p>

      {/* Render the cards */}
      <div className="flex flex-col gap-6">{renderCategoryCards()}</div>
    </div>
  );
};

export default CategoryDetailPage;
