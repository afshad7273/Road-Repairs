import { useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  // Sample products data
  const products = [
    { id: 1, name: "Engine Oil", image: "/images/bg3.jpg", description: "High-performance synthetic engine oil." },
    { id: 2, name: "Brake Pads", image: "/images/pic2.jpg", description: "Durable and reliable brake pads for safety." },
    { id: 3, name: "Car Battery", image: "/images/pic3.jpg", description: "Long-lasting and high-capacity car battery." },
    { id: 4, name: "Tires", image: "/images/pic4.jpg", description: "All-season tires for superior grip and performance." },
    { id: 5, name: "Spark Plugs", image: "/images/pic5.jpg", description: "Efficient and durable spark plugs for ignition." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-5 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">Road Repairs</h1>
          <div className="space-x-6">
            <Link to="/workhome" className="hover:text-gray-300 transition">Home</Link>
            <Link to="/servicework" className="hover:text-gray-300 transition">Service</Link>
            <Link to="/products" className="hover:text-gray-300 transition">Products</Link>
            <Link to="/view products" className="hover:text-gray-300 transition">View Products</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 py-16">
        <section className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-indigo-800">Our Products</h2>
          <p className="mt-3 text-gray-600 text-lg">Explore our premium collection. Total Products: {products.length}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="shadow-lg hover:shadow-xl transition-all bg-white rounded-2xl overflow-hidden transform hover:scale-105 duration-300"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-60 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white text-center p-5">
        <p>&copy; 2025 AutoAssist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Products;
