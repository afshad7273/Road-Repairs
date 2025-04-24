import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyComplaintsAPI } from "../services/breakdownServices";

function Workshphome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/");
  };

  const { data: complaints } = useQuery({
    queryKey: ["my-workshop-complaints"],
    queryFn: getMyComplaintsAPI,
    refetchInterval: 5*1000, 
  });

  const pendingCount = complaints?.requested.filter((c) => !c.accepted && !c.rejected)?.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-4 flex flex-col md:flex-row md:justify-between items-center shadow-lg">
        <h1 className="text-3xl font-extrabold mb-2 md:mb-0">Road Repairs</h1>

        <div className="flex items-center space-x-4">
          <Link to="/workhome">
            <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Home</button>
          </Link>
          <Link to="/products">
            <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Products</button>
          </Link>
          <Link to="/viewproducts">
            <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">View Products</button>
          </Link>
          <Link to="/workshopprofile">
            <button className="text-white px-4 py-2 hover:text-gray-300 transition-all">Profile</button>
          </Link>

          {/* Notification Bell */}
          <Link to="/servicework" className="relative">
            <span className="text-2xl hover:text-yellow-300 transition-all">🔔</span>
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </Link>

          <button onClick={handleLogout} className="text-white px-4 py-2 hover:text-gray-300 transition-all">
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 bg-gradient-to-r from-purple-700 to-indigo-600 text-white">
        <h2 className="text-5xl font-extrabold">Your Trusted Vehicle Repair Hub</h2>
        <p className="mt-4 text-lg">Reliable and Fast Service for Every Breakdown</p>
        <Link to="/servicework">
          <button className="mt-6 bg-yellow-400 text-gray-900 px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all">
            Complaints
          </button>
        </Link>
      </header>

      {/* Services Section */}
      <section className="py-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="shadow-lg hover:shadow-xl transition-all p-8 text-center bg-white rounded-lg">
          <div className="text-indigo-600 text-6xl mb-4">🔧</div>
          <h3 className="text-2xl font-bold">Expert Repairs</h3>
          <p className="text-gray-600">Engine, brakes, and everything in between.</p>
        </div>
        <div className="shadow-lg hover:shadow-xl transition-all p-8 text-center bg-white rounded-lg">
          <div className="text-indigo-600 text-6xl mb-4">🛠️</div>
          <h3 className="text-2xl font-bold">Routine Maintenance</h3>
          <p className="text-gray-600">Oil changes, inspections, and tire rotations.</p>
        </div>
        <div className="shadow-lg hover:shadow-xl transition-all p-8 text-center bg-white rounded-lg">
          <div className="text-indigo-600 text-6xl mb-4">🚗</div>
          <h3 className="text-2xl font-bold">Emergency Assistance</h3>
          <p className="text-gray-600">Breakdown support anytime, anywhere.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="text-center py-16 bg-gray-100">
        <h2 className="text-3xl font-extrabold text-indigo-700">What Our Customers Say</h2>
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <p className="text-gray-600">"Excellent service! Got my car fixed in no time!"</p>
            <h4 className="mt-4 font-semibold">- John D.</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <p className="text-gray-600">"Fast and reliable! Highly recommend this workshop."</p>
            <h4 className="mt-4 font-semibold">- Sarah L.</h4>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="text-center py-16 bg-gradient-to-r from-purple-800 to-indigo-700 text-white">
        <h2 className="text-3xl font-extrabold">Need Immediate Help?</h2>
        <p className="mt-3">Contact our expert mechanics now.</p>
        <button className="mt-5 bg-yellow-400 text-gray-900 px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all">
          Call Now
        </button>
      </section> */}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white text-center p-5 mt-10">
        <p>&copy; 2025 AutoAssist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Workshphome;
