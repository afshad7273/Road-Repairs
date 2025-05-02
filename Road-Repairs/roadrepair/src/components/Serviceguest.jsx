import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Engine Repair",
    description: "Expert diagnostics and repairs to keep your engine running smoothly.",
    image: "/images/engine image.png"
  },
  {
    title: "Brake Services",
    description: "Ensuring your safety with top-quality brake repairs and replacements.",
    image: "/images/brake.png"
  },
  {
    title: "Tire Replacement",
    description: "High-quality tires and professional fitting for a smooth ride.",
    image: "/images/tyre service.png"
  },
  {
    title: "Battery Replacement",
    description: "Reliable battery replacement to keep your vehicle powered up.",
    image: "/images/battery service.png"
  },
  {
    title: "Oil Change",
    description: "Regular oil changes to maintain engine health and performance.",
    image: "/images/oil service.png"
  }
];

const Serviceguest = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen w-full">
      {/* Navbar */}
      <nav className="bg-gray-950 p-6 text-lg shadow-lg w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/images/service-2.png" alt="Icon" className="w-10 h-10" />
            <h1 className="text-3xl font-bold text-yellow-400">Road Repairs</h1>
          </div>
          <ul className="flex space-x-6 items-center">
            <li><Link to="/welcomesection" className="hover:text-yellow-400 transition">Home</Link></li>
            {/* <li><Link to="/About guest" className="hover:text-yellow-400 transition">About</Link></li> */}
            <li><Link to="/service guest" className="hover:text-yellow-400 transition">Services</Link></li>
            <li><Link to="/findlocation" className="hover:text-yellow-400 transition">Find Nearest Service</Link></li>
            {/* <li><Link to="/contactguest" className="hover:text-yellow-400 transition">Contact</Link></li> */}
            <li><Link to="/purchase" className="hover:text-yellow-400 transition">Purchase</Link></li>
         <li><Link to="/servicehistguest" className="hover:text-yellow-400 transition">Service History</Link></li>
         {/* <li><Link to="/reviewguest" className="hover:text-yellow-400 transition">Review</Link></li> */}
         <li> <Link to="/profilecust" className="hover:text-yellow-400 transition"> Profile</Link></li>
          </ul>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="relative h-[50vh] flex items-center justify-center text-center bg-cover bg-center w-full" style={{ backgroundImage: "url('/images/bg3.jpg')" }}>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-6xl font-bold text-yellow-400">Our Services</h1>
          <p className="mt-6 text-xl text-white">Quality auto repair services for every need.</p>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-20 px-8 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="p-8 bg-gray-800 rounded-lg shadow-lg text-center text-white">
              <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-2xl font-semibold">{service.title}</h3>
              <p className="mt-4 text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-yellow-500 text-center text-gray-900 w-full">
        <h2 className="text-4xl font-bold">Schedule Your Service Today</h2>
        <p className="mt-4 text-lg">Get in touch with our experts for top-notch auto repair services.</p>
        <a href="tel:+18881234567" className="mt-6 inline-block bg-gray-900 text-yellow-400 px-8 py-4 rounded-lg text-lg">Call Now: (888) 123-4567</a>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-950 text-yellow-400 w-full text-center">
        <p className="text-lg">&copy; 2025 Road Repairs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Serviceguest;
