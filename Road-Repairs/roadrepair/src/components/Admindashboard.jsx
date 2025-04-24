import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaUsers, FaTools, FaChartBar, FaSignOutAlt, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Admindashboard = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Clear auth token (adjust as needed)
    navigate("/adminlogin"); // Redirect to login page
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 text-white p-6 flex flex-col shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-yellow-500">
          <span className="text-red-600">Admin</span> Panel
        </h1>

        <nav className="mt-8">
          <ul className="space-y-4 text-lg">
            <li className="p-4 flex items-center gap-3 hover:bg-gray-700 rounded cursor-pointer transition duration-300">
              <FaChartBar /> Dashboard
            </li>
            <li className="relative">
              <button className="p-4 w-full flex justify-between items-center hover:bg-gray-700 rounded transition duration-300" onClick={() => toggleDropdown("customers")}>
                <span className="flex items-center gap-3"><FaUsers /> Customers</span>
                <FaChevronDown className={`transition-transform ${openDropdown === "customers" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "customers" && (
                <ul className="ml-8 mt-2 space-y-2">
                  <Link to="/customerview"><li className="hover:text-yellow-400 cursor-pointer">View Customers</li></Link>
                </ul>
              )}
            </li>
            <li className="relative">
              <button className="p-4 w-full flex justify-between items-center hover:bg-gray-700 rounded transition duration-300" onClick={() => toggleDropdown("workshop")}>
                <span className="flex items-center gap-3"><FaTools /> Workshop</span>
                <FaChevronDown className={`transition-transform ${openDropdown === "workshop" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "workshop" && (
                <ul className="ml-8 mt-2 space-y-2">
                  <Link to="/workshopview"><li className="hover:text-yellow-400 cursor-pointer">View Workshops</li></Link>
                  <Link to="/workshoplist"><li className="hover:text-yellow-400 cursor-pointer">Add Workshop</li></Link>
                </ul>
              )}
            </li>

            <li className="relative">
              <button className="p-4 w-full flex justify-between items-center hover:bg-gray-700 rounded transition duration-300" onClick={() => toggleDropdown("customers")}>
                <span className="flex items-center gap-3"><FaUsers /> Reports</span>
                <FaChevronDown className={`transition-transform ${openDropdown === "customers" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "customers" && (
                <ul className="ml-8 mt-2 space-y-2">
                  <Link to="/workshoppie"><li className="hover:text-yellow-400 cursor-pointer">Workshop Registered</li></Link>
                </ul>
               
              )}

{openDropdown === "customers" && (
                <ul className="ml-8 mt-2 space-y-2">
                  <Link to="/workshopstatuspie"><li className="hover:text-yellow-400 cursor-pointer">Workshop Status</li></Link>
                </ul>
               
              )}



{openDropdown === "customers" && (
                <ul className="ml-8 mt-2 space-y-2">
                  <Link to="/custpie"><li className="hover:text-yellow-400 cursor-pointer">Customer Registered</li></Link>
                </ul>
      
              )}
              
{/* {openDropdown === "customers" && (
                <ul className="ml-8 mt-2 space-y-2">
                  <Link to="/workshoprevpie"><li className="hover:text-yellow-400 cursor-pointer">Workshop Reviews</li></Link>
                </ul>
               
              )} */}

            </li>



            <li className="p-4 flex items-center gap-3 hover:bg-red-600 rounded cursor-pointer transition duration-300" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white p-6 shadow-md flex justify-end items-center px-6">
          <button className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
            <FaUserCircle className="text-white text-2xl" />
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">Total Users: <strong>1,200</strong></div>
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">Active Services: <strong>350</strong></div>
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">Revenue: <strong>$50,000</strong></div>
        </div>

        {/* Charts Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
            <div className="w-72 h-72">
              <Pie data={{ labels: ["Services", "Customers", "Workshops"], datasets: [{ data: [350, 1200, 150], backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
            <div className="w-full">
              <Bar data={{ labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], datasets: [{ label: "Monthly Revenue ($)", data: [5000, 8000, 6000, 10000, 9000, 12000], backgroundColor: "#4CAF50" }] }} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
