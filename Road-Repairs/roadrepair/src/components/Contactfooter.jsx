import React from 'react'

function Contactfooter() {
  return (
    <footer className="bg-gray-900 text-white py-10">
    <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
      {/* About Us */}
      <div>
        <h3 className="text-xl font-semibold mb-4">About Us</h3>
        <ul className="space-y-2">
          <li><a href="/about" className="hover:text-gray-400">About</a></li>
          <li><a href="/services" className="hover:text-gray-400">Services</a></li>
          {/* <li><a href="/blog" className="hover:text-gray-400">Blog</a></li> */}
          <li><a href="/gallery" className="hover:text-gray-400">Gallery</a></li>
          <li><a href="/contact" className="hover:text-gray-400">Contact Us</a></li>
        </ul>
      </div>
      
      {/* Latest Tweets */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Latest Tweets</h3>
        <div className="mb-4">
          <p className="text-sm">It is a long established fact that a reader will be distracted by the readable content of a page.</p>
          <a href="#" className="text-gray-400 text-sm">1 Hour ago</a>
        </div>
        <div>
          <p className="text-sm">It is a long established fact that a reader will be distracted by the readable content of a page.</p>
          <a href="#" className="text-gray-400 text-sm">3 Hours ago</a>
        </div>
      </div>
      
      {/* Get in Touch */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
        <p className="text-sm mb-4">Stay updated with our latest news and updates.</p>
        <form className="flex">
          <input type="email" placeholder="Enter Email" className="p-2 rounded-l bg-gray-800 text-white focus:outline-none" />
          <button type="submit" className="bg-red-500 px-4 py-2 rounded-r hover:bg-red-600">Subscribe</button>
        </form>
        <div className="flex space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-dribbble"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-google"></i></a>
        </div>
      </div>
    </div>
    
    {/* Copyright Section */}
    <div className="mt-10 text-center text-gray-500 text-sm">
      <p>Copyright &copy; {new Date().getFullYear()} <span className="text-red-500">Auto Cars</span>. All rights reserved | Design by <a href="http://w3layouts.com" className="hover:text-white">W3layouts</a></p>
    </div>
  </footer>
  )
}

export default Contactfooter