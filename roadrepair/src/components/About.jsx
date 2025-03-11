import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  Link
  return (
    <div>
      {/* Banner Section */}
      <div className="banner2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="logo flex items-center">
            <h1 className="text-3xl font-bold">
              <a href="index.html" className="flex items-center text-white">
                <img src="images/car.png" alt="" className="inline-block mr-3 w-12" />
                AUTO <span className="text-yellow-500">CARS</span>
              </a>
            </h1>
          </div>
          <div className="top_details flex items-center space-x-6">
            <p className="text-lg">Call Us: (880)123 2500</p>
            <div className="search">
              <form className="flex items-center">
                <input type="text" placeholder="Search..." className="px-4 py-2 rounded-l-lg border-2 border-gray-300 focus:ring-2 focus:ring-yellow-500" />
                <button type="submit" className="bg-yellow-500 px-4 py-2 rounded-r-lg hover:bg-yellow-600">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <ul className="flex justify-center space-x-6 text-white">
            <li><Link to="/" className="hover:text-yellow-500">Home</Link></li>
            <li><Link to="/About" className="hover:text-yellow-500">About</Link></li>
            <li><Link to="/Services" className="hover:text-yellow-500">Services</Link></li>
            <li><Link to="/Blog" className="hover:text-yellow-500">Blog</Link></li>
            <li><Link to="/Gallery" className="hover:text-yellow-500">Gallery</Link></li>
            <li><Link to="/Contact" className="hover:text-yellow-500">Contact Us</Link></li>
          </ul>
        </div>
      </nav>

      {/* About Us Section */}
      <div className="about py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">About Us</h2>
          <ol className="breadcrumb text-sm mb-8 text-center text-gray-600">
            <li><Link to="/" className="text-blue-600">Home</Link></li>
            <li className="text-gray-600">About</li>
          </ol>

          {/* About Info */}
          <div className="about-grids flex flex-wrap justify-between mb-12">
            <div className="w-full sm:w-1/3 mb-8">
              <img src="images/pic3.jpg" alt="" className="rounded-lg shadow-lg w-full" />
            </div>
            <div className="w-full sm:w-2/3 px-4">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">Proin laoreet magna vel sapien iaculis pretium.</h3>
              <p className="text-lg text-gray-700">
                Nam nisl massa, aliquet id venenatis aliquam, facilisis nec lacus. Aenean non est neque. Nam a rutrum elit. Maecenas
                eu ultricies tortor, a suscipit magna. Donec sit amet risus ornare, venenatis enim sed, ultrices lectus. Maecenas consectetur,
                libero id porttitor mattis, enim purus scelerisque ante, tempus dapibus quam lacus id dui. Curabitur lorem ex, dignissim
                sit amet tincidunt id, hendrerit vel ante. In ut felis at ante feugiat accumsan non id enim. Morbi magna dui, fringilla
                eget mollis quis, tincidunt quis nulla. Praesent lobortis lacus nisl, sit amet euismod ipsum ornare eu. Cras a consequat
                tortor, efficitur ultrices odio.
              </p>
            </div>
          </div>

          {/* Services Section */}
          <div className="abt-btm-grids grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {['Car Repair', 'Wheel Alignment', 'Car Wash', 'Auto Tuning'].map((service, index) => (
              <div key={index} className="abt-sec bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
                <div className="num-heading flex items-center mb-4">
                  <div className="number text-3xl font-semibold text-blue-600 mr-4">
                    <span>{index + 1}</span>
                  </div>
                  <div className="heading">
                    <h4 className="text-xl font-semibold text-gray-800">{service}</h4>
                  </div>
                </div>
                <p className="text-gray-600">
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,
                  by injected humour.
                </p>
              </div>
            ))}
          </div>

          {/* Our Team Section */}
          {/* <div className="works mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Team</h3>
            <div className="team-members grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {['t1.jpg', 't2.jpg', 't3.jpg', 't4.jpg'].map((image, index) => (
                <div key={index} className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
                  <img src={`images/${image}`} alt="" className="rounded-lg mb-4 mx-auto w-40 h-40 object-cover" />
                  <h4 className="text-xl font-semibold text-gray-800">Phasellus scipitilifen lus.</h4>
                  <p className="text-gray-600">Kuspendisse laoreet augue iderti wer interdum merti oremolo lectusto odio, sedorolu fringilla estero libero.</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer2 bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="ftr2-grids grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="ftr2-grid1">
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <ul className="space-y-2">
              <li><Link to="/" className="hover:text-yellow-500">Home</Link></li>
            <li><Link to="/About" className="hover:text-yellow-500">About</Link></li>
            <li><Link to="/Services" className="hover:text-yellow-500">Services</Link></li>
            <li><Link to="/Blog" className="hover:text-yellow-500">Blog</Link></li>
            <li><Link to="/Gallery" className="hover:text-yellow-500">Gallery</Link></li>
            <li><Link to="/Contact" className="hover:text-yellow-500">Contact Us</Link></li>
              </ul>
            </div>
            <div className="ftr2-grid2">
              <h3 className="text-xl font-bold mb-4">Latest Tweets</h3>
              <div className="ftr2-grid mb-4">
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                <a href="#" className="text-blue-600">1 Hour ago</a>
              </div>
              <div className="ftr2-grid">
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                <a href="#" className="text-blue-600">3 Hour ago</a>
              </div>
            </div>
            <div className="ftr6-grid3">
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <p className="mb-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
              <form>
                <input type="text" className="text-white bg-gray-700 px-4 py-2 rounded" placeholder="Enter Email" />
                <input type="submit" value="Subscribe" className="bg-yellow-500 text-white px-4 py-2 rounded ml-4" />
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
          <div className="ftr2-bottom text-center text-sm mt-8">
            <p>Copyright &copy; 2015 <span>Auto cars</span> All rights reserved | Design by <a href="http://w3layouts.com" className="text-yellow-500">W3layouts</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
