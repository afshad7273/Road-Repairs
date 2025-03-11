import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

    const [isOpen,setIsOpen] = useState(false)
  return (
    <nav className="bg-gray-900 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center">
          <img src="/images/car.png" alt="Logo" className="h-8 mr-2" /> AUTO CARS
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        </button>
        <ul className={`md:flex gap-6 ${isOpen ? "block" : "hidden"} md:block`}> 
          <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
          <li><Link to="/About" className="hover:text-gray-400">About</Link></li>
          <li><Link to="/Services" className="hover:text-gray-400">Services</Link></li>
          <li><Link to="/Blog" className="hover:text-gray-400">Blog</Link></li>
          <li><Link to="/Gallery" className="hover:text-gray-400">Gallery</Link></li>
          <li><Link to="/Contact" className="hover:text-gray-400">Contact</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar