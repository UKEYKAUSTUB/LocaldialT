import React , { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate,useLocation } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import AboutUs from "./components/pages/Aboutus";
import Register from "./components/pages/Register";
import VerifyEmail from "./components/pages/VerifyEmail";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Categories from "./components/pages/Categories";
import AddBusinessForm from "./components/pages/AddBusinessForm";
import Login from "./components/pages/Login";
import ResetPassword from "./components/pages/ResetPassword";
import Services from "./components/pages/Services";
import BusinessCard from "./components/layout/BusinessCard";
import CategoryDetailPage from "./components/pages/CategoryDetailPage";
import PrivateRoute from "./components/pages/PrivateRoute"


const App = () => {
  const handleCategoryChange = (category) => {
    console.log("Selected category:", category);
  };
 const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on initial load
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert token to boolean (true/false)
  }, []);
  


  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar onCategoryChange={handleCategoryChange}  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <main className="flex-grow">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:category" element={<CategoryDetailPage />} />
            <Route path="/verifyEmail" element={< VerifyEmail />} />
            <Route path="/addform" element={<PrivateRoute>  <AddBusinessForm /> </PrivateRoute> } />
            <Route path="/businesscard" element={<BusinessCard/>} />
            <Route path="/services" element={<Services />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </main>
        <Footer/>

        
      </div>
    </Router>
  );
};

export default App;