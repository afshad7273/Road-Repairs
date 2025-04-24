import React from 'react'

function Servicesfooter() {
  return (
    <footer className="bg-gray-900 text-white py-10">
    <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* About Us */}
      <div>
        <h3 className="text-xl font-semibold mb-4">About Us</h3>
        <ul className="space-y-2">
          {['About', 'Services', 'Blog', 'Gallery', 'Contact Us'].map((item) => (
            <li key={item}>
              <a href={`/${item.toLowerCase()}`} className="hover:text-gray-400">{item}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Latest Tweets */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Latest Tweets</h3>
        {["1 Hour ago", "3 Hours ago"].map((time, index) => (
          <div key={index} className="mb-4">
            <p className="text-gray-400">
              It is a long established fact that a reader will be distracted by the content.
            </p>
            <a href="#" className="text-blue-400 text-sm">{time}</a>
          </div>
        ))}
      </div>

      {/* Get in Touch */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
        <p className="text-gray-400 mb-4">
          It is a long established fact that a reader will be distracted by readable content.
        </p>
        <form className="flex flex-col space-y-2">
          <input
            type="email"
            placeholder="Enter Email"
            className="p-2 rounded text-black focus:outline-none"
          />
          <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
            Subscribe
          </button>
        </form>
        {/* Social Icons */}
        <div className="flex space-x-4 mt-4">
          {['facebook', 'twitter', 'dribbble', 'google'].map((icon) => (
            <a href="#" key={icon} className="text-gray-400 hover:text-white text-2xl">
              <i className={`fab fa-${icon}`}></i>
            </a>
          ))}
        </div>
      </div>
    </div>
    {/* Footer Bottom */}
    <div className="text-center mt-8 border-t border-gray-700 pt-4">
      <p>
        &copy; {new Date().getFullYear()} <span className="text-blue-400">Auto Cars</span>. All rights reserved | Design by
        <a href="http://w3layouts.com" className="text-blue-400 ml-1">W3Layouts</a>
      </p>
    </div>
  </footer>
  )
}

export default Servicesfooter