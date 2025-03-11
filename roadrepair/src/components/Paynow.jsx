import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Paynow = () => {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Calculate total price
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.quantity * 99.99, 0);

  // Handle Payment Confirmation
  const handlePayment = () => {
    alert(`Payment of $${totalAmount.toFixed(2)} successful via ${paymentMethod}! 🎉`);
    setShowModal(false);
  };

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
          <div className="mt-6 p-8 bg-gray-900 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold">Ordered Products</h3>

            {/* Display Ordered Products */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedItems.map((item, index) => (
                <div key={index} className="p-6 bg-gray-800 rounded-lg flex items-center space-x-6 shadow-md">
                  <img src={`/images/product${item.id}.jpg`} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-sm">Quantity: <span className="font-bold">{item.quantity}</span></p>
                    <p className="text-sm text-yellow-400 font-bold">Total: ${(item.quantity * 99.99).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div className="mt-6 text-3xl font-bold text-green-400">
              Total Amount: ${totalAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="w-full flex justify-center py-10">
        <button
          className="px-8 py-4 bg-green-500 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-green-600 transition"
          onClick={() => setShowModal(true)}
        >
          Pay Now
        </button>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-10 rounded-lg shadow-xl w-[500px] text-center">
            <h2 className="text-3xl font-bold text-yellow-400">Select Payment Method</h2>

            {/* Payment Options */}
            <div className="mt-6">
              <select
                className="w-full p-3 bg-gray-800 text-white rounded-md text-lg"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
                <option value="netbanking">Net Banking</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === "card" && (
              <div className="mt-6 text-left">
                <label className="block text-lg">Card Number:</label>
                <input type="text" className="w-full p-3 bg-gray-800 text-white rounded-md mt-2 text-lg" placeholder="1234 5678 9012 3456" />
                <div className="mt-4 flex space-x-4">
                  <div>
                    <label className="block text-lg">Expiry:</label>
                    <input type="text" className="w-full p-3 bg-gray-800 text-white rounded-md mt-2 text-lg" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-lg">CVV:</label>
                    <input type="text" className="w-full p-3 bg-gray-800 text-white rounded-md mt-2 text-lg" placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                className="px-8 py-3 bg-green-500 text-white font-bold rounded-md text-lg hover:bg-green-600"
                onClick={handlePayment}
              >
                Confirm Payment
              </button>
              <button
                className="px-8 py-3 bg-red-500 text-white font-bold rounded-md text-lg hover:bg-red-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-10 bg-gray-950 text-yellow-400 w-full text-center">
        <p className="text-lg mt-6">&copy; 2025 Road Repairs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Paynow;