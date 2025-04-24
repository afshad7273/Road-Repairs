import React from "react";
import { Link } from "react-router-dom";

const Aboutguest = () => {
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
            <li><Link to="/About guest" className="hover:text-yellow-400 transition">About</Link></li>
            <li><Link to="/service guest" className="hover:text-yellow-400 transition">Services</Link></li>
            <li><Link to="/findlocation" className="hover:text-yellow-400 transition">Find Service</Link></li>
            <li><Link to="/servicehistguest" className="hover:text-yellow-400 transition">History</Link></li>
            {/* <li><Link to="/contactguest" className="hover:text-yellow-400 transition">Contact</Link></li> */}
            <li><Link to="/reviewguest" className="hover:text-yellow-400 transition">Reviews</Link></li>
            <li><Link to="/profilecust" className="hover:text-yellow-400 transition">Profile</Link></li>
          </ul>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="relative h-[50vh] flex items-center justify-center text-center bg-cover bg-center w-full" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?car,mechanic')" }}>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-6xl font-bold text-yellow-400">About Us</h1>
          <p className="mt-6 text-xl text-white">Your trusted partner for reliable auto repair services.</p>
        </div>
      </header>

      {/* Who We Are */}
      <section className="py-20 px-8 bg-gray-800 text-white w-full">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-yellow-400">Who We Are</h2>
          <p className="mt-6 text-lg text-gray-300">
            Road Repairs has been providing top-notch auto repair services for over a decade.
            Our team of certified professionals ensures your vehicle gets the best care possible.
          </p>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-20 px-8 w-full bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-semibold text-yellow-400">Our Mission</h2>
            <p className="mt-6 text-lg text-gray-300">
              Our mission is to deliver high-quality, affordable, and reliable auto repair services.
              We strive to keep our customers safe on the road by ensuring their vehicles are in peak condition.
            </p>
          </div>
          <img src="https://source.unsplash.com/800x600/?garage,car-service" alt="Mission" className="w-full h-80 object-cover rounded-lg" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-8 bg-gray-800 text-white w-full text-center">
        <h2 className="text-4xl font-semibold text-yellow-400">Why Choose Us?</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {[
            { title: "Experienced Professionals", desc: "Certified experts with years of industry experience." },
            { title: "Affordable Pricing", desc: "Quality services at competitive rates." },
            { title: "Customer Satisfaction", desc: "Dedicated to providing the best customer experience." },
            { title: "24/7 Emergency Assistance", desc: "We are available around the clock for urgent repairs." },
            { title: "High-Tech Equipment", desc: "We use the latest tools and technology for efficient repairs." },
          ].map(({ title, desc }) => (
            <div key={title} className="p-8 bg-gray-900 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">{title}</h3>
              <p className="mt-4 text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-semibold text-yellow-400">What Our Customers Say</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {[
            { name: "John Doe", feedback: "Excellent service! My car runs like new thanks to Road Repairs." },
            { name: "Emily Smith", feedback: "Quick and professional! Highly recommend their services." },
          ].map(({ name, feedback }) => (
            <div key={name} className="p-6 bg-gray-800 rounded-lg shadow-md">
              <p className="text-lg text-gray-300">"{feedback}"</p>
              <h3 className="mt-4 text-yellow-400 text-xl">- {name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-yellow-500 text-center text-gray-900 w-full">
        <h2 className="text-4xl font-bold">Get In Touch</h2>
        <p className="mt-4 text-lg">Contact us today to schedule an appointment or learn more about our services.</p>
        <a href="tel:+18881234567" className="mt-6 inline-block bg-gray-900 text-yellow-400 px-8 py-4 rounded-lg text-lg">Call Now: (888) 123-4567</a>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-950 text-yellow-400 w-full text-center">
        <p className="text-lg">&copy; 2025 Road Repairs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Aboutguest;
