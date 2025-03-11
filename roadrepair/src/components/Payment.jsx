import React from "react";
import { useLocation, Link } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };

  // Calculate total price
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.quantity * 99.99, 0);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-blue-950 text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-950 p-6 text-lg shadow-lg w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-yellow-400">Payment</h1>
        </div>
      </nav>

      {/* Payment Summary */}
      <section className="py-10 px-8 w-full flex-grow">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-yellow-400">Order Summary</h2>
          <div className="mt-6 p-6 bg-gray-900 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold">Ordered Products</h3>

            {/* Display Ordered Products */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedItems.map((item, index) => (
                <div key={index} className="p-4 bg-gray-800 rounded-lg flex items-center space-x-6 shadow-md">
                  <img src={`/images/product${item.id}.jpg`} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-sm">Quantity: <span className="font-bold">{item.quantity}</span></p>
                    <p className="text-sm text-yellow-400 font-bold">Total: ${(item.quantity * 99.99).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div className="mt-6 text-3xl font-bold text-yellow-400">
              Total Amount: ${totalAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="w-full flex justify-center py-10">
        <Link 
          to="/paynow" 
          state={{ selectedItems }} // 🔥 Pass selected items to Paynow.jsx
        >
          <button className="px-6 py-3 bg-green-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-green-600 transition">
            Pay Now
          </button>
        </Link> 
      </div>

      {/* Footer */}
      <footer className="py-10 bg-gray-950 text-yellow-400 w-full text-center">
        <p className="text-lg mt-6">&copy; 2025 Road Repairs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PaymentPage;
