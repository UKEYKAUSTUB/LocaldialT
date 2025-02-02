import React, { useEffect, useState } from "react";
import { fetchServices } from "../apiCalls";
import BusinessCard from "../layout/BusinessCard";

const ServicesPage = () => {
  const [services, setServices] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchServices();
        console.log("Fetched services:", data);
        setServices(data);
      } catch (err) {
        setError(err.message || "Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };
  
    getServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/src/assets/images/Spinner2.gif" alt="Loading..." className="w-42 h-40" />
      </div>
    );
  }
  

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(services) && services.length > 0 ? (
          services.map((service) => (
            <BusinessCard
              key={service._id}
              name={service.name}
              description={service.description}
              image={service.image}
              category={service.category}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No services available</p>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
