import { useState } from "react";
import { Link } from "react-router-dom";

function Workshphome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-4 flex flex-col items-center shadow-lg">
        <h1 className="text-3xl font-extrabold mb-2">Road Repairs</h1>
        <div className="flex space-x-4">
         <Link to="/workhome"> <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Home</button></Link>
          <Link to="/workhome"><button className="text-white px-4 py-2 hover:text-gray-300 transition-all">About</button></Link>
          {/* <Link to="/workhome"><button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Gallery</button></Link>
          <Link to="/workhome"> <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Blog</button></Link> */}
          <Link to="/servicework"> <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Service</button></Link>
          {/* <Link to="/workhome"><button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Contact</button></Link>
          <Link to="/workhome"><button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Feedback</button></Link> */}
          <Link to="/products"> <button className="text-white px-4 py-2 hover:text-gray-300 transition-all"> Products</button></Link>
          <Link to="/view products"> <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">View Products</button></Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 bg-gradient-to-r from-purple-700 to-indigo-600 text-white">
        <h2 className="text-5xl font-extrabold">Instant Vehicle Breakdown Assistance</h2>
        <p className="mt-4 text-lg">Find workshops & get roadside help in minutes.</p>
        <button className="mt-6 bg-white text-indigo-600 px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all">Get Help Now</button>
      </header>

      {/* Features Section */}
      <section className="py-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="shadow-lg hover:shadow-xl transition-all p-8 text-center bg-gradient-to-br from-white to-gray-100 rounded-lg">
          <div className="text-indigo-600 text-6xl mb-4">🚗</div>
          <h3 className="text-2xl font-bold">Emergency Help</h3>
          <p className="text-gray-600">Quick assistance for vehicle issues.</p>
        </div>
        
        <div className="shadow-lg hover:shadow-xl transition-all p-8 text-center bg-gradient-to-br from-white to-gray-100 rounded-lg">
          <div className="text-indigo-600 text-6xl mb-4">📍</div>
          <h3 className="text-2xl font-bold">Find Nearby Workshops</h3>
          <p className="text-gray-600">Locate repair centers instantly.</p>
        </div>
        
        <div className="shadow-lg hover:shadow-xl transition-all p-8 text-center bg-gradient-to-br from-white to-gray-100 rounded-lg">
          <div className="text-indigo-600 text-6xl mb-4">📞</div>
          <h3 className="text-2xl font-bold">24/7 Support</h3>
          <p className="text-gray-600">Expert help anytime you need.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gradient-to-r from-purple-800 to-indigo-700 text-white">
        <h2 className="text-3xl font-extrabold">Need Immediate Help?</h2>
        <p className="mt-3">Contact our emergency helpline now.</p>
        <button className="mt-5 bg-white text-purple-700 px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all">Call for Help</button>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white text-center p-5 mt-10">
        <p>&copy; 2025 AutoAssist. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Workshphome;
