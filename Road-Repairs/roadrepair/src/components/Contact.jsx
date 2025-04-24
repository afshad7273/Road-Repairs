import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  
  return (
    <div>
      {/* Banner Section */}
      <div className="banner bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="header flex justify-between items-center">
            <div className="logo">
              <h1>
                <a href="index.html">
                  <img src="images/service-2.png" alt="Auto Cars" className="inline-block mr-2" />
                  ROAD <span className="text-blue-500">REPAIRS</span>
                </a>
              </h1>
            </div>
            <div className="top_details flex items-center space-x-6">
              <p className="text-gray-300">(880)123 2500</p>
              <div className="search">
                <form className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 rounded-lg border-2 border-gray-300"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-lg bg-blue-600 text-white"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
          <nav className="navbar mt-6">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-white hover:text-blue-500">Home</Link>
              </li>
              <li>
                <Link to="/About" className="text-white hover:text-blue-500">About</Link>
              </li>
              <li>
                <Link to="/Services" className="text-white hover:text-blue-500">Services</Link>
              </li>
              <li>
                <Link to="/Blog" className="text-white hover:text-blue-500">Blog</Link>
              </li>
              <li>
                <Link to="/Gallery" className="text-white hover:text-blue-500">Gallery</Link>
              </li>
              <li>
                <Link to="/Contact" className="text-white hover:text-blue-500">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="contact-top text-center mb-8">
            <h2 className="text-3xl font-semibold">Contact</h2>
            <ol className="breadcrumb flex justify-center space-x-2 mt-4">
              <li><a href="index.html" className="text-blue-600">Home</a></li>
              <li className="text-gray-500">Contact</li>
            </ol>
          </div>

          {/* Map and Contact Form */}
          <div className="contact-bottom flex flex-wrap justify-between">
            {/* Google Map */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6632.248000703498!2d151.265683!3d-33.7832959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12abc7edcbeb07%3A0x5017d681632bfc0!2sManly+Vale+NSW+2093%2C+Australia!5e0!3m2!1sen!2sin!4v1433329298259"
                frameBorder="0"
                className="w-full h-64"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </div>

            {/* Contact Details and Form */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="contact-text w-full max-w-xl">
                <div className="contact-right w-full mb-8">
                  <div className="address mb-4">
                    <h5 className="font-semibold">Address</h5>
                    <p>The company name, <span className="block">Glasglow Dr 40 Fe 72</span></p>
                  </div>
                  <div className="address">
                    <h5 className="font-semibold">Contact Info</h5>
                    <p>
                      Tel: 1115550001 <span className="block">Fax: 190-4509-494</span>
                      Email: <a href="mailto:example@email.com" className="text-blue-600">contact@example.com</a>
                    </p>
                  </div>
                </div>

                <div className="contact-left w-full">
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="p-2 w-full border-2 border-gray-300 rounded-lg"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="p-2 w-full border-2 border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      className="p-2 w-full border-2 border-gray-300 rounded-lg"
                    />
                    <textarea
                      placeholder="Message"
                      className="p-2 w-full border-2 border-gray-300 rounded-lg"
                    />
                    <div className="submit-btn text-center">
                      <button type="submit" className="p-3 w-full bg-blue-600 text-white rounded-lg">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer2 bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="ftr2-grids flex flex-wrap justify-between">
            {/* About Us */}
            <div className="ftr2-grid1 w-full md:w-1/3 mb-8 md:mb-0">
              <h3 className="text-xl font-semibold">About Us</h3>
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
            <div className="ftr2-grid2 w-full md:w-1/3 mb-8 md:mb-0">
              <h3 className="text-xl font-semibold">Latest Tweets</h3>
              <div className="ftr2-grid mb-4">
                <p>It is a long established fact that a reader will be distracted by the content...</p>
                <a href="#" className="text-blue-600">1 Hour ago</a>
              </div>
              <div className="ftr2-grid">
                <p>It is a long established fact that a reader will be distracted by the content...</p>
                <a href="#" className="text-blue-600">3 Hours ago</a>
              </div>
            </div>

            {/* Get in Touch */}
            <div className="ftr6-grid3 w-full md:w-1/3">
              <h3 className="text-xl font-semibold">Get in Touch</h3>
              <form>
                <input
                  type="text"
                  className="text p-2 w-full border-2 border-gray-300 rounded-lg mb-4"
                  placeholder="Enter Email"
                />
                <input
                  type="submit"
                  value="Subscribe"
                  className="p-3 w-full bg-blue-600 text-white rounded-lg"
                />
              </form>
              <div className="social mt-4">
                <ul className="flex space-x-4">
                  <li><a href="#" className="text-blue-600"><i className="facebook"></i></a></li>
                  <li><a href="#" className="text-blue-600"><i className="twitter"></i></a></li>
                  <li><a href="#" className="text-blue-600"><i className="dribble"></i></a></li>
                  <li><a href="#" className="text-blue-600"><i className="google"></i></a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="ftr2-bottom text-center text-gray-500 mt-8">
            <p>&copy; 2015 Auto Cars. All rights reserved | Design by <a href="http://w3layouts.com" className="text-blue-600">W3layouts</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
