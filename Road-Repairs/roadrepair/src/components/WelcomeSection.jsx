import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const images = [
  "/images/bg3.jpg",
  "/images/pic3.jpg",
  "/images/pic4.jpg",
  "/images/pic5.jpg",
  "/images/audi.jpg"
];

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
 
  const handleLogout = () => {
    // Clear authentication data
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    
    sessionStorage.clear();
    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-blue-950 text-white min-h-screen w-full">
      
      {/* Navbar */}
      <nav className="bg-gray-950 p-6 text-lg shadow-lg w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/images/service-2.png" alt="Icon" className="w-10 h-10" />
            <h1 className="text-3xl font-bold text-yellow-400">Road Repairs</h1>
          </div>
          <ul className="flex space-x-6 items-center">
            <li><Link to="/welcomesection" className="hover:text-yellow-400 transition">Home</Link></li>
            {/* <li><Link to="/About guest" className="hover:text-yellow-400 transition">About</Link></li> */}
            <li><Link to="/service guest" className="hover:text-yellow-400 transition">Services</Link></li>
            <li><Link to="/findlocation" className="hover:text-yellow-400 transition">Find Nearest Service</Link></li>
            {/* <li><Link to="/contactguest" className="hover:text-yellow-400 transition">Contact</Link></li> */}
            <li><Link to="/purchase" className="hover:text-yellow-400 transition">product</Link></li>
            <li><Link to="/servicehistguest" className="hover:text-yellow-400 transition">Service History</Link></li>
            {/* <li><Link to="/reviewguest" className="hover:text-yellow-400 transition">Review</Link></li> */}
            <li><button onClick={handleLogout} className="hover:text-yellow-400 transition">Logout</button></li>
          </ul>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header 
        className="relative h-[90vh] flex items-center justify-center text-center bg-cover bg-center w-full transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentImage]})`, backgroundBlendMode: "overlay" }}>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-6xl font-bold text-yellow-400">Reliable Auto Repair Services</h1>
          <p className="mt-6 text-xl text-white">Expert solutions to keep your vehicle running smoothly</p>
          <Link to="/services" className="mt-8 inline-block px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg text-lg transition">Explore Services</Link>
        </div>
      </header>
      
      {/* About Section */}
      <section className="py-20 px-8 bg-gray-800 text-white w-full">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-yellow-400">Why Choose Us?</h2>
          <p className="mt-6 text-lg text-gray-300">We provide high-quality auto repair services with skilled professionals.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-8 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 bg-gray-900 rounded-lg shadow-lg text-center text-white">
            <h3 className="text-2xl font-semibold">Engine Repair</h3>
            <p className="mt-4">Expert engine diagnostics and repairs.</p>
          </div>
          <div className="p-8 bg-gray-900 rounded-lg shadow-lg text-center text-white">
            <h3 className="text-2xl font-semibold">Brake Services</h3>
            <p className="mt-4">Ensuring your safety with quality brake repairs.</p>
          </div>
          <div className="p-8 bg-gray-900 rounded-lg shadow-lg text-center text-white">
            <h3 className="text-2xl font-semibold">Tire Replacement</h3>
            <p className="mt-4">High-quality tires and professional fitting.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-400 text-center text-gray-900 w-full">
        <h2 className="text-4xl font-bold">Need Immediate Assistance?</h2>
        <p className="mt-4 text-lg">Call us now for quick and efficient services.</p>
        <a href="tel:+18881234567" className="mt-6 inline-block bg-gray-900 text-yellow-400 px-8 py-4 rounded-lg text-lg">Call Now: (888) 123-4567</a>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-950 text-yellow-400 w-full text-center">
        <ul className="flex flex-wrap justify-center space-x-6 text-lg">
          <li><Link to="/" className="hover:text-white transition">Home</Link></li>
          <li><Link to="/about" className="hover:text-white transition">About</Link></li>
          <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
          <li><Link to="/findlocation" className="hover:text-white transition">Find Nearest Shop</Link></li>
        </ul>
        <p className="text-lg mt-6">&copy; 2025 Road Repairs. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default HomePage;
