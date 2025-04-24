import React from 'react'

function Galleryfooter() {
  return (
    <footer className="bg-gray-900 text-white py-10">
    <div className="container mx-auto grid md:grid-cols-3 gap-8 px-5">
      {/* About Us */}
      <div>
        <h3 className="text-lg font-semibold mb-4">About Us</h3>
        <ul className="space-y-2">
          <li><a href="/about" className="hover:text-gray-400">About</a></li>
          <li><a href="/services" className="hover:text-gray-400">Services</a></li>
          {/* <li><a href="/blog" className="hover:text-gray-400">Blog</a></li> */}
          <li><a href="/gallery" className="hover:text-gray-400">Gallery</a></li>
          {/* <li><a href="/contact" className="hover:text-gray-400">Contact Us</a></li> */}
        </ul>
      </div>

      {/* Latest Tweets */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Latest Tweets</h3>
        <div className="mb-4">
          <p>It is a long established fact that a reader will be distracted by the readable content of a page.</p>
          <a href="#" className="text-blue-400 hover:underline">1 Hour ago</a>
        </div>
        <div>
          <p>It is a long established fact that a reader will be distracted by the readable content of a page.</p>
          <a href="#" className="text-blue-400 hover:underline">3 Hours ago</a>
        </div>
      </div>

      {/* Get in Touch */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
        <p className="mb-4">It is a long established fact that a reader will be distracted by the readable content of a page.</p>
        <form className="flex space-x-2">
          <input
            type="email"
            placeholder="Enter Email"
            className="p-2 w-full rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Subscribe</button>
        </form>
        {/* Social Links */}
        <div className="flex space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-dribbble"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-google"></i></a>
        </div>
      </div>
    </div>
    {/* Footer Bottom */}
    <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
      <p>Copyright &copy; 2015 <span className="text-white">Auto Cars</span> All rights reserved | Design by <a href="http://w3layouts.com" className="text-blue-400 hover:underline">W3layouts</a></p>
    </div>
  </footer>
  )
}

export default Galleryfooter