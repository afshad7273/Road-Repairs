import React from 'react';
import { Link } from 'react-router-dom';

const Footerblog = () => {
  Link
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div className="ftr2-grid1">
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <ul>
            <li><Link to="/" className="hover:text-yellow-500">Home</Link></li>
            <li><Link to="/About" className="hover:text-yellow-500">About</Link></li>
            <li><Link to="/Services" className="hover:text-yellow-500">Services</Link></li>
            <li><Link to="/Blog" className="hover:text-yellow-500">Blog</Link></li>
            <li><Link to="/Gallery" className="hover:text-yellow-500">Gallery</Link></li>
            <li><Link to="/Contact" className="hover:text-yellow-500">Contact Us</Link></li>
            </ul>
          </div>

          {/* Latest Tweets */}
          <div className="ftr2-grid2">
            <h3 className="text-xl font-semibold mb-4">Latest Tweets</h3>
            <div className="ftr2-grid mb-4">
              <p className="text-gray-400">It is a long established fact that a reader will be distracted by the of a reader page when at its layout.</p>
              <a href="#" className="text-yellow-400">1 Hour ago</a>
            </div>
            <div className="ftr2-grid">
              <p className="text-gray-400">It is a long established fact that a reader will be distracted by the of a reader page when at its layout.</p>
              <a href="#" className="text-yellow-400">3 Hour ago</a>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="ftr6-grid3">
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-400 mb-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <form className="mb-4">
              <input
                type="text"
                className="p-2 w-full rounded-md text-gray-800 mb-2"
                placeholder="Enter Email"
                onFocus={(e) => e.target.value = ''}
                onBlur={(e) => e.target.value = e.target.value === '' ? 'Enter Email' : e.target.value}
              />
              <input
                type="submit"
                value="Subscribe"
                className="bg-yellow-400 text-white p-2 w-full rounded-md cursor-pointer"
              />
            </form>

            {/* Social Icons */}
            <div className="social">
              <ul className="flex space-x-4">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400"><i className="facebook"></i></a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400"><i className="twitter"></i></a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400"><i className="dribble"></i></a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400"><i className="google"></i></a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="ftr2-bottom mt-8 text-center text-gray-400">
          <p>&copy; 2015 <span className="font-semibold">Auto cars</span> All rights reserved | Design by <a href="http://w3layouts.com" className="text-yellow-400">W3layouts</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footerblog;