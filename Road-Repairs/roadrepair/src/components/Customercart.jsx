import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import axios from 'axios';

const WorkshopCustomerCart = () => {
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  console.log(orders);
  

  
  const itemsPerPage = 20;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = sessionStorage.getItem('token');
      if (!token) {
        setError('Please log in to view orders.');
        navigate('/login');
        return;
      }

      console.log('Fetching orders with token:', token);
      console.log('API URL:', `https://road-repairs.onrender.com/api/v1/order/workshop`);

      const response = await axios.get(`https://road-repairs.onrender.com/api/v1/order/workshop`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Fetched orders:', JSON.stringify(response.data, null, 2));
      setOrders(response?.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please check your internet connection or try again later.');
      } else if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        sessionStorage.removeItem('token');
        navigate('/login');
      } else if (err.response?.status === 500) {
        setError(`Server error: ${err.response?.data?.message || 'Internal server error. Please try again later.'}`);
      } else if (err.response?.status === 404) {
        setError('Orders endpoint not found. Please contact support.');
      } else {
        setError(
          err.response?.data?.message ||
          err.message ||
          'Failed to fetch orders. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [navigate]);

  const filteredOrders = useMemo(() => {
    const filtered = orders.filter((order) => {
      const hasValidItems = order.items && order.items.length > 0 && order.items.some(
        (item) => item.product && item.quantity !== undefined && item.totalPrice !== undefined
      );
      const matchesSearch = search === '' || (order.customer?.name || '').toLowerCase().includes(search.toLowerCase());
      return hasValidItems && matchesSearch;
    });
    console.log('Filtered orders:', JSON.stringify(filtered, null, 2));
    return filtered;
  }, [search, orders]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredOrders.length);
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getOrderSummary = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    return { totalPrice };
  };

  const getPaymentStatus = (paymentMethod, paymentStatus) => {
    if (paymentMethod === 'cash') {
      return paymentStatus === 'cash_pending' ? 'Cash on Hand' : 'Cash Paid';
    }
    return paymentStatus === 'completed' ? 'Paid' : 'Pending';
  };

  const getPaymentMethodDisplay = (paymentMethod) => {
    return paymentMethod === 'card' ? 'Card' : 'Cash on Hand';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
      <header className="text-center py-12 bg-gradient-to-r from-indigo-700 to-purple-600 text-white shadow-lg">
        <h1 className="text-5xl font-extrabold flex items-center justify-center gap-3">
          <MdOutlineShoppingCart className="text-yellow-400" />
          Customer Orders
        </h1>
        <p className="mt-3 text-lg opacity-90">View customer purchase details.</p>
      </header>

      <nav className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-4 flex justify-center shadow-lg">
        <div className="flex space-x-6">
          <Link to="/products">
            <button className="text-white hover:text-gray-300">Products</button>
          </Link>
          <Link to="/workshopreview">
            <button className="text-white hover:text-gray-300">Review</button>
          </Link>
          <Link to="/viewproducts">
            <button className="text-white hover:text-gray-300">View Products</button>
          </Link>
          <Link to="/workshopprofile">
            <button className="text-white hover:text-gray-300">Profile</button>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center py-12 gap-12">
        <section className="max-w-5xl w-full px-6">
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Search customer name..."
              className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">🛒 Customer Orders</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 text-left text-lg">
                  <th className="p-5 w-1/4">Customer Name</th>
                  <th className="p-5 w-1/5 text-center">Payment Method</th>
                  <th className="p-5 w-1/5 text-center">Total Price</th>
                  <th className="p-5 w-1/5 text-center">Booked Date</th>
                  <th className="p-5 w-1/5 text-center">Payment</th>
                  <th className="p-5 w-1/5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 p-6">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="text-center text-red-500 p-6">
                      {error}
                      <button
                        onClick={() => fetchOrders()}
                        className="ml-4 text-yellow-500 underline hover:text-yellow-600"
                      >
                        Retry
                      </button>
                    </td>
                  </tr>
                ) : paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order, index) => {
                    const { totalPrice } = getOrderSummary(order.items);
                    const paymentStatus = getPaymentStatus(order.paymentMethod, order.paymentStatus);
                    return (
                      <tr
                        key={order.orderId}
                        className="hover:bg-gray-100 transition-all border-b border-gray-200"
                      >
                        <td className="p-4">{order.customer?.name || 'Unknown Customer'}</td>
                        <td className="p-4 text-center">{getPaymentMethodDisplay(order.paymentMethod)}</td>
                        <td className="p-4 text-center">{totalPrice.toFixed(2)}</td>
                        <td className="p-4 text-center">{formatDate(order.createdAt)}</td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              paymentStatus === 'Paid' || paymentStatus === 'Cash Paid'
                                ? 'bg-green-200 text-green-800'
                                : paymentStatus === 'Cash on Hand'
                                ? 'bg-yellow-200 text-yellow-800'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            {paymentStatus}
                          </span>
                          {paymentStatus === 'Cash on Hand' && (
                            <button
                              className="ml-2 bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition"
                              onClick={async () => {
                                try {
                                  await axios.post(
                                    `${BASE_URL}/api/v1/order/mark-cash-completed`,
                                    { orderId: order.orderId },
                                    { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } }
                                  );
                                  fetchOrders();
                                } catch (err) {
                                  console.error('Error marking cash payment:', err);
                                  setError('Failed to mark cash payment as completed.');
                                }
                              }}
                            >
                              Mark Paid
                            </button>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                            onClick={() => setSelectedOrder(order)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 p-6">
                      No customer orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md text-white font-semibold transition ${
                  currentPage === 1
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-700 hover:bg-indigo-800'
                }`}
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-800 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md text-white font-semibold transition ${
                  currentPage === totalPages
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-700 hover:bg-indigo-800'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>

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
              <p><strong>Customer Name:</strong> {selectedOrder.customer?.name || 'Unknown Customer'}</p>
              <p><strong>Phone:</strong> {selectedOrder.customer?.phone || 'N/A'}</p>
              <p><strong>Address:</strong> {selectedOrder.customer?.address || 'N/A'}</p>
              <p>
                <strong>Payment Method:</strong>{' '}
                {getPaymentMethodDisplay(selectedOrder.paymentMethod)}
              </p>
              <p>
                <strong>Total Price:</strong>{' '}
                {selectedOrder.items.reduce((sum, item) => sum + (item.totalPrice || 0), 0).toFixed(2)}
              </p>
              <p><strong>Product IDs:</strong> {selectedOrder.items.map((item) => item.product._id).join(', ')}</p>
              <p>
                <strong>Product Types:</strong>{' '}
                {selectedOrder.items.map((item) => item.product.productType).join(', ')}
              </p>
              <p>
                <strong>Quantities:</strong>{' '}
                {selectedOrder.items.map((item) => item.quantity).join(', ')}
              </p>
              <p>
                <strong>Product Names:</strong>{' '}
                {selectedOrder.items.map((item) => item.product.productName || 'N/A').join(', ')}
              </p>
              <p><strong>Date Booked:</strong> {formatDate(selectedOrder.createdAt)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopCustomerCart;