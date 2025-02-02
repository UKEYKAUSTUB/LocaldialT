import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white-700 text-black-100 py-8 shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-xl font-bold">LocalDial</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <a
            href="/home"
            className="hover:text-orange-200 transition duration-300"
          >
            Home
          </a>
          <a
            href="/aboutus"
            className="hover:text-orange-200 transition duration-300"
          >
            About Us
          </a>
          <a
            href="#services"
            className="hover:text-orange-200 transition duration-300"
          >
            Services
          </a>
          <a
            href="/contact"
            className="hover:text-orange-200 transition duration-300"
          >
            Contact
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a
            href="https://facebook.com"
            className="text-black-200 hover:text-black-300 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            className="text-black-200 hover:text-black-300 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            className="text-black-200 hover:text-black-300 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center mt-4">
        <p className="text-sm text-black-200">
          &copy; {new Date().getFullYear()} LocalDial. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
