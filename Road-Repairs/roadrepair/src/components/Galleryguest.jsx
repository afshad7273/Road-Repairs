import React from 'react';
import { Link } from 'react-router-dom';

const images = [
  { src: 'images/1.jpg', title: 'Mauris accumsan' },
  { src: 'images/2.jpg', title: 'Vivamus mauris' },
  { src: 'images/3.jpg', title: 'Aliquam fringilla' },
  { src: 'images/4.jpg', title: 'Nam lacinia' },
  { src: 'images/5.jpg', title: 'Integer laoreet' },
  { src: 'images/6.jpg', title: 'Quisque feugiat' },
  { src: 'images/7.jpg', title: 'Aliquam eget' },
  { src: 'images/8.jpg', title: 'Nullam ligula' },
];

function Galleryguest() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-950 p-6 text-lg shadow-lg w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/images/service-2.png" alt="Icon" className="w-10 h-10" />
            <h1 className="text-3xl font-bold text-yellow-400">Road Repairs</h1>
          </div>
          <ul className="flex space-x-6 items-center text-white">
            <li><Link to="/welcomesection" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link to="/About guest" className="hover:text-yellow-400 transition">About</Link></li>
            <li><Link to="/service guest" className="hover:text-yellow-400 transition">Services</Link></li>
            <li><Link to="/galleryguest" className="text-yellow-400 font-semibold">Gallery</Link></li>
            <li><Link to="/contactguest" className="hover:text-yellow-400 transition">Contact</Link></li>
            <li><Link to="/purchase" className="hover:text-yellow-400 transition">Purchase</Link></li>
            <li><Link to="/servicehistguest" className="hover:text-yellow-400 transition">Service History</Link></li>
            <li><Link to="/reviewguest" className="hover:text-yellow-400 transition">Review</Link></li>

          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">Our Gallery</h2>
            <nav className="mt-2 text-gray-600">
              <Link to="/" className="text-blue-500 hover:underline">Home</Link> / <span>Gallery</span>
            </nav>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-white text-lg font-semibold">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 bg-gray-950 text-yellow-400 w-full text-center">
        {/* <ul className="flex flex-wrap justify-center space-x-6 text-lg">
          <li><Link to="/welcomesection" className="hover:text-white transition">Home</Link></li>
          <li><Link to="/About guest" className="hover:text-white transition">About</Link></li>
          <li><Link to="/serviceguest" className="hover:text-white transition">Services</Link></li>
          <li><Link to="/galleryguest" className="text-yellow-400 font-semibold">Gallery</Link></li>
          <li><Link to="/contactguest" className="hover:text-white transition">Contact</Link></li>
          <li><Link to="/purchase" className="hover:text-white transition">Purchase</Link></li>
          <li><Link to="/purchase" className="hover:text-yellow-400 transition">Service History</Link></li>
          
        </ul> */}
        <p className="text-lg mt-6">&copy; 2025 Road Repairs. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Galleryguest;
