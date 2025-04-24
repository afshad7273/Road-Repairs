import React from 'react'
import { Link } from 'react-router-dom'

function Gallerybanner() {
  return (
    <div className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="images/car.png" alt="Logo" className="h-10" />
            <h1 className="text-2xl font-bold">AUTO <span className="text-yellow-400">CARS</span></h1>
          </div>
          <div className="flex items-center space-x-6">
            <p className="text-lg">(880)123 2500</p>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="px-4 py-2 text-black rounded-md focus:outline-none"
              />
              <button className="absolute right-0 top-0 px-3 py-2 bg-yellow-500 rounded-r-md">🔍</button>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="mt-6">
          <ul className="flex justify-center space-x-6 text-lg font-medium">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/About" className="hover:text-yellow-400">About</Link></li>
            <li><Link to="/Services" className="hover:text-yellow-400">Services</Link></li>
            {/* <li><Link to="/Blog" className="hover:text-yellow-400">Blog</Link></li> */}
            <li><Link to="/Gallery" className="text-yellow-400">Gallery</Link></li>
            {/* <li><Link to="/Contact" className="hover:text-yellow-400">Contact Us</Link></li> */}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Gallerybanner