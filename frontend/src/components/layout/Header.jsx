import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Advertisement images
  const images = [
    "https://static.vecteezy.com/system/resources/previews/008/407/977/non_2x/realistic-celery-ads-horizontal-poster-vector.jpg",
    "https://i.pinimg.com/736x/b7/f5/ce/b7f5ce68ff3166b351a6e3c6ee934020.jpg",
    "https://img.freepik.com/free-vector/flat-design-grocery-store-sale-banner_23-2151069702.jpg",
    "https://www.shutterstock.com/image-vector/banner-announcing-mega-discount-half-260nw-1962489325.jpg",
  ];

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <header className="bg-white text-black-900 py-8 shadow-lg w-full">
      <h1 className="text-4xl font-extrabold text-center">
        Connecting You to Trusted Local Services, Anytime, Anywhere!
      </h1>
      <p className="text-lg text-center">
        Find and connect with the best local businesses in your area. Support
        local, thrive together.
      </p>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Slideshow Section */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg">
            <div className="h-64 overflow-hidden relative rounded-lg">
              <img
                src={images[currentIndex]}
                alt={`Advertisement ${currentIndex + 1}`}
                className="w-full h-full object-cover rounded-lg transition-all duration-500 ease-in-out"
              />
            </div>
          </div>

        {/* Cards Section */}
    <div className="flex flex-1 gap-4 justify-between">
      {/* Card 1 */}
      <Link to="/category/hotels" className="w-full">
        <div className="bg-white shadow-md rounded-lg p-4 h-64 flex flex-col justify-between items-center group hover:shadow-xl transition-shadow duration-300">
          <img
            src="/src/assets/images/hotels.png"
            alt="Hotels"
            className="w-full h-40 object-cover rounded-lg transition-transform duration-300 transform group-hover:-translate-y-2"
          />
          <div className="text-center">
            <h3 className="text-2xl font-bold mt-2">Hotels</h3>
            <p className="text-sm text-gray-600">
              Find the best offers in your area
            </p>
          </div>
        </div>
      </Link>

      {/* Card 2 */}
      <Link to="/category/hospitals" className="w-full">
        <div className="bg-white shadow-md rounded-lg p-4 h-64 flex flex-col justify-between items-center group hover:shadow-xl transition-shadow duration-300">
          <img
            src="/src/assets/images/Hospitals.png"
            alt="Hospitals"
            className="w-full h-40 object-cover rounded-lg transition-transform duration-300 transform group-hover:-translate-y-2"
          />
          <div className="text-center">
            <h3 className="text-2xl font-bold mt-2">Hospitals</h3>
            <p className="text-sm text-gray-600">Explore trusted service.</p>
          </div>
        </div>
      </Link>

      {/* Card 3 */}
      <Link to="/category/gyms" className="w-full">
        <div className="bg-white shadow-md rounded-lg p-4 h-64 flex flex-col justify-between items-center group hover:shadow-xl transition-shadow duration-300">
          <img
            src="/src/assets/images/GYM.png"
            alt="GYM"
            className="w-full h-40 object-cover rounded-lg transition-transform duration-300 transform group-hover:-translate-y-2"
          />
          <div className="text-center">
            <h3 className="text-2xl font-bold mt-2">GYM</h3>
            <p className="text-sm text-gray-600">Local businesses.</p>
          </div>
        </div>
      </Link>
    </div>
  </div>
</div>
    </header>
  );
};

export default Header;
