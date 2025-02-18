import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onCategoryChange, onFilter, isLoggedIn, setIsLoggedIn  }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (token exists in localStorage)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };

  const categories = [
    "All Categories",
    "Grocery Shops",
    "Hospitals",
    "Gyms",
    "Restaurants",
    "Hotels",
    "Pharmacies",
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);

    if (category !== "All Categories") {
      navigate(`/category/${category.toLowerCase().replace(/\s+/g, "-")}`);
    }

    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };



  return (
    <nav className="bg-white-300 text-black-700 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-4xl font-extrabold">
            <span className="text-orange-400">Local</span>
            <span className="text-blue-600">Dial</span>
          </span>
        </div>

        {/* Spacer for separation */}
        <div className="flex-grow"></div>

        {/* Input Box Dropdown */}
        <div className="relative">
          <input
            type="text"
            className="w-64 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            placeholder="Select Category"
            value={selectedCategory}
            readOnly
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          />
          {isDropdownOpen && (
            <div className="absolute z-10 bg-white border rounded-lg mt-1 w-full shadow-lg">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-black-200"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Spacer between Dropdown and Navigation Links */}
        <div className="ml-6"></div>

        {/* Navigation Links */}
        <div className="text-xl hidden md:flex items-center space-x-6">
          <Link to="/home" className="hover:text-orange-200 transition duration-300 no-underline">
            Home
          </Link>
          <Link to="/aboutus" className="hover:text-orange-200 transition duration-300 no-underline">
            About Us
          </Link>
          <Link to="/services" className="hover:text-orange-200 transition duration-300 no-underline">
            Services
          </Link>

          {/* Only Show "Add Your Services" if Logged In */}
          {isLoggedIn && (
            <Link to="/addform" className="hover:text-orange-200 transition duration-300 no-underline">
              Add Your Services
            </Link>
          )}
        </div>

        {/* Authentication Buttons */}
        <div className="ml-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
            >
              Logout
            </button>
          ) : (
            <Link to="/register" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-orange-400 transition duration-300 shadow-md no-underline">
              Sign Up/Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
