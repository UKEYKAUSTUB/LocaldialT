import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      name: 'Grocery Shops',
      image: 'https://thumbs.dreamstime.com/b/grocery-shop-cartoon-greengrocer-store-facade-front-view-isolated-one-story-building-awning-signboard-place-sale-small-210597654.jpg',
      link: '/category/grocery-shops',
    },
    {
      name: 'Hospitals',
      image: 'https://cdn.vectorstock.com/i/500p/21/80/flat-hospital-vector-20532180.jpg',
      link: '/category/hospitals',
    },
    {
      name: 'Gyms',
      image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fitness-logo%2C-gym-logo%2C-fitness-center-logo-%28-design-template-386146ae4164059d8fb5bbf00a6c28bc_screen.jpg?ts=1669139043',
      link: '/category/gyms',
    },
    {
      name: 'Restaurants',
      image: 'https://static.vecteezy.com/system/resources/previews/035/881/034/non_2x/facade-of-restaurant-building-city-background-street-cafe-bistro-dinner-coffee-house-concept-illustration-in-flat-style-vector.jpg',
      link: '/restaurants',
    },
    {
      name: 'Hotels',
      image: 'https://thumbs.dreamstime.com/b/hotel-city-view-vector-illustration-flat-cartoon-hotel-building-street-road-big-skyscraper-town-landscape-font-94431804.jpg',
      link: '/category/hotels',
    },
    {
      name: 'Pharmacies',
      image: 'https://media.istockphoto.com/id/607264882/vector/facade-pharmacy-store-with-a-signboard-awning-symbol-on-shopwindow.jpg?s=612x612&w=0&k=20&c=4oxrqk-ReIZm6BPXzSiDXFnDYeDBk5nG2TrpzWkgxXA=',
      link: '/category/pharmacies',
    },
  ];

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-6 text-black-900">Select Your Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              <Link to={category.link} className="block">
                <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-black-700">{category.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
