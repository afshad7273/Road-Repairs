import React, { useState } from "react";
import { Link } from "react-router-dom";

const PurchasePage = () => {
  const [quantities, setQuantities] = useState(Array(6).fill(0));
  const [filter, setFilter] = useState("");

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = Math.max(0, newQuantities[index] + value);
      return newQuantities;
    });
  };

  const hasSelectedItems = quantities.some((quantity) => quantity > 0);

  const products = [
    { id: 1, name: "Brake Pads" },
    { id: 2, name: "Oil Filter" },
    { id: 3, name: "Spark Plug" },
    { id: 4, name: "Air Filter" },
    { id: 5, name: "Car Battery" },
    { id: 6, name: "Tire" },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-gray-900 to-blue-950 text-white min-h-screen w-full">
      {/* Navbar */}
      <nav className="bg-gray-950 p-6 text-lg shadow-lg w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-yellow-400">Purchase Auto Parts</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="relative h-[50vh] flex items-center justify-center text-center bg-cover bg-center w-full"
        style={{ backgroundImage: "url(/images/purchase-bg.jpg)", backgroundBlendMode: "overlay" }}
      >
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl font-bold text-yellow-400">Purchase Auto Parts</h1>
          <p className="mt-4 text-xl text-white">Get high-quality auto parts delivered to your doorstep.</p>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto py-6 px-8">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-3 text-white bg-gray-800 rounded-lg border border-gray-300"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Product Section */}
      <section className="py-20 px-8 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="p-6 bg-gray-900 rounded-lg shadow-lg text-center">
              <img src={`/images/product${product.id}.jpg`} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-2xl font-semibold mt-4">{product.name}</h3>
              <p className="mt-2 font-bold text-yellow-400">$99.99</p>
              <div className="mt-4 flex items-center justify-center space-x-4">
                <button 
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                  onClick={() => handleQuantityChange(index, -1)}>
                  -
                </button>
                <span className="text-xl font-bold">{quantities[index]}</span>
                <button 
                  className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition"
                  onClick={() => handleQuantityChange(index, 1)}>
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Orders Button */}
      {hasSelectedItems && (
        <div className="flex justify-center pb-10">
          <Link
            to="/payment"
            state={{
              selectedItems: products
                .map((product, index) => ({
                  ...product,
                  quantity: quantities[index],
                }))
                .filter((item) => item.quantity > 0), // Ensure only selected items are passed
            }}
          >
            <button className="px-6 py-3 bg-yellow-500 text-gray-900 text-lg font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition">
              Orders
            </button>
          </Link>
        </div>
      )}

      {/* Footer */}
      <footer className="py-10 bg-gray-950 text-yellow-400 w-full text-center">
        <p className="text-lg mt-6">&copy; 2025 Road Repairs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PurchasePage;
