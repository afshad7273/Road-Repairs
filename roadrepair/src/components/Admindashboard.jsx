import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admindashboard = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div className="flex h-screen w-full bg-gray-200 text-gray-800">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 text-white p-6 space-y-5 flex flex-col">
        <h1 className="text-2xl font-bold text-center text-yellow-500"><span class='text-red-600'>Admin</span> <span class='text-yellow-500'>Panel</span></h1>
        <nav className="flex-1">
          <ul className="space-y-4 text-lg">
            <li className="p-4 hover:bg-gray-700 rounded cursor-pointer">Dashboard</li>
            
            {/* Customers Dropdown */}
            <li className="relative">
              <button
                className="p-4 w-full text-left hover:bg-gray-700 rounded"
                onClick={() => toggleDropdown("customers")}
              >
                Customers
              </button>
              {openDropdown === "customers" && (
                <ul className="absolute left-full top-0 mt-1 bg-gray-800 w-48 rounded shadow-md z-10">
                  <li className="p-4 hover:bg-gray-600">Customer View</li>
                </ul>
              )}
            </li>
            
            {/* Workshop Dropdown */}
            <li className="relative">
              <button
                className="p-4 w-full text-left hover:bg-gray-700 rounded"
                onClick={() => toggleDropdown("workshop")}
              >
                Workshop
              </button>
              {openDropdown === "workshop" && (
                <ul className="absolute left-full top-0 mt-1 bg-gray-800 w-48 rounded shadow-md z-10">
                  <li className="p-4 hover:bg-gray-600">Workshop Registered</li>
                  <li className="p-4 hover:bg-gray-600">Workshop List</li>
                </ul>
              )}
            </li>
            
            <li className="p-4 hover:bg-gray-700 rounded cursor-pointer">Reports</li>
            
            {/* Services Dropdown */}
            <li className="relative">
              <button
                className="p-4 w-full text-left hover:bg-gray-700 rounded"
                onClick={() => toggleDropdown("services")}
              >
                Services
              </button>
              {openDropdown === "services" && (
                <ul className="absolute left-full top-0 mt-1 bg-gray-800 w-48 rounded shadow-md z-10">
                  <li className="p-4 hover:bg-gray-600">Add Service</li>
                  <li className="p-4 hover:bg-gray-600">Manage Services</li>
                </ul>
              )}
            </li>
            
            <li className="p-4 hover:bg-red-600 rounded cursor-pointer">Logout</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-100 p-6 shadow-md flex justify-between items-center px-6 relative">
          <input type="text" placeholder="Search..." className="bg-gray-300 px-4 py-3 rounded-lg outline-none w-1/3 text-lg" />
          
          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button
              className="w-12 h-12 bg-gray-500 rounded-full"
              onClick={() => toggleDropdown("adminProfile")}
            ></button>
            {openDropdown === "adminProfile" && (
              <ul className="absolute right-0 mt-2 bg-white w-36 rounded shadow-md z-10 border text-lg">
                <li className="p-4 hover:bg-gray-200 cursor-pointer">Details</li>
                <li className="p-4 hover:bg-red-500 text-red-700 cursor-pointer">Logout</li>
              </ul>
            )}
          </div>
        </div>

        {/* Dashboard Content with Hover Navigation */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow text-center cursor-pointer hover:bg-gray-300" onClick={() => navigate("/users")}> 
            <h2 className="text-2xl font-bold">1,200</h2>
            <p className="text-gray-500 text-lg">Total Users</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow text-center cursor-pointer hover:bg-gray-300" onClick={() => navigate("/services")}> 
            <h2 className="text-2xl font-bold">350</h2>
            <p className="text-gray-500 text-lg">Active Services</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow text-center cursor-pointer hover:bg-gray-300" onClick={() => navigate("/revenue")}> 
            <h2 className="text-2xl font-bold">$50,000</h2>
            <p className="text-gray-500 text-lg">Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
