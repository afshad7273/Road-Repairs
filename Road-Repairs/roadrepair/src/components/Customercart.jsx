import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';

// Dummy data for orders, matching ProductForm fields
const dummyOrders = [
  {
    _id: '1',
    customer: { name: 'John Doe', phone: '123-456-7890', address: '123 Main St, City' },
    productId: 'PROD001',
    productName: 'Car Tire',
    productType: 'Tires',
    productPrice: 99.99,
    productCount: 2,
    createdAt: '2025-04-20T10:00:00Z',
  },
  {
    _id: '2',
    customer: { name: 'Jane Smith', phone: '987-654-3210', address: '456 Oak Ave, Town' },
    productId: 'PROD002',
    productName: 'Brake Pad',
    productType: 'Engine Parts',
    productPrice: 49.99,
    productCount: 4,
    createdAt: '2025-04-19T15:30:00Z',
  },
  {
    _id: '3',
    customer: { name: 'Alice Brown', phone: '555-123-4567', address: '789 Pine Rd, Village' },
    productId: 'PROD003',
    productName: 'Oil Filter',
    productType: 'Accessories',
    productPrice: 19.99,
    productCount: 1,
    createdAt: '2025-04-18T09:00:00Z',
  },
];

function CustomerCart() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const sortedOrders = dummyOrders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
      <header className="text-center py-12 bg-gradient-to-r from-indigo-700 to-purple-600 text-white shadow-lg">
        <h1 className="text-5xl font-extrabold flex items-center justify-center gap-3">
          <MdOutlineShoppingCart className="text-yellow-400" />
          Your Booked Items
        </h1>
        <p className="mt-3 text-lg opacity-90">View your booked items.</p>
      </header>

      <nav className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-4 flex justify-center shadow-lg">
        <div className="flex space-x-6">
          <Link to="/findlocation"><button className="text-white hover:text-gray-300">Find Location</button></Link>
          <Link to="/products"><button className="text-white hover:text-gray-300">Products</button></Link>
          <Link to="/workshopreview"><button className="text-white hover:text-gray-300">Review</button></Link>
          <Link to="/cart"><button className="text-white hover:text-gray-300">Cart</button></Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center py-12 gap-12">
        <section className="max-w-5xl w-full px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">🛒 Your Orders</h2>
          {sortedOrders.length === 0 ? (
            <p className="text-center text-gray-500">No booked items found.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {sortedOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white shadow-lg rounded-lg p-6 border-l-8 border-yellow-500 hover:shadow-xl transition-all cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-yellow-600">{order.productName}</h3>
                  <p className="text-gray-600">Product ID: {order.productId}</p>
                  <p className="text-gray-500 mt-2"><strong>Type:</strong> {order.productType}</p>
                  <p className="text-gray-500"><strong>Price:</strong> ${order.productPrice.toFixed(2)}</p>
                  <p className="text-gray-500"><strong>Count:</strong> {order.productCount}</p>
                  <p className="text-gray-500"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <div className="mt-4">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-[700px] relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
              onClick={() => setSelectedOrder(null)}
            >
              <FaTimes size={24} />
            </button>
            <h3 className="text-3xl font-bold mb-6 text-center text-indigo-700">Order Details</h3>
            <div className="text-lg space-y-4">
              <p><strong>Customer Name:</strong> {selectedOrder.customer.name}</p>
              <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.customer.address}</p>
              <p><strong>Product ID:</strong> {selectedOrder.productId}</p>
              <p><strong>Product Name:</strong> {selectedOrder.productName}</p>
              <p><strong>Product Type:</strong> {selectedOrder.productType}</p>
              <p><strong>Product Price:</strong> ${selectedOrder.productPrice.toFixed(2)}</p>
              <p><strong>Product Count:</strong> {selectedOrder.productCount}</p>
              <p><strong>Date Booked:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerCart;