import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Productpurchase = () => {
  const [search, setSearch] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch completed orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get token from localStorage (adjust based on your auth setup)
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        // Fetch orders from the API
        const response = await axios.get(`https://road-repairs.onrender.com/api/v1/order/customer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Process orders: filter completed and flatten items
        const completedOrders = response?.data;
        console.log(completedOrders);

        setPurchases(completedOrders);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch orders. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter purchases based on search input
  const filteredHistory = useMemo(() => {
    return purchases.filter((record) =>
      record.productName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, purchases]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-black min-h-screen flex flex-col text-white">
      {/* Navbar */}
      <nav className="bg-black/80 backdrop-blur-md p-5 shadow-lg w-full sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/images/service-2.png" alt="Icon" className="w-10 h-10" />
            <h1 className="text-3xl font-bold text-yellow-400">Road Repairs</h1>
          </div>
          <ul className="flex gap-6 text-base">
            <li>
              <Link to="/welcomesection" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/service guest" className="hover:text-yellow-400 transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/findlocation" className="hover:text-yellow-400 transition">
                Find Service
              </Link>
            </li>
            <li>
              <Link to="/producthistory" className="text-yellow-400 font-semibold underline">
                History
              </Link>
            </li>
            <li>
              <Link to="/profilecust" className="hover:text-yellow-400 transition">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow py-12 px-6">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold text-yellow-400">Completed Product Purchase History</h2>
          <p className="mt-4 text-lg text-gray-300">Review your completed product purchases</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search product name..."
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Purchase History Table */}
        <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-yellow-400 text-gray-900 text-left text-lg">
                <th className="p-5">Serial No</th>
                <th className="p-5">Product Name</th>
                <th className="p-5">Product Price</th>
                <th className="p-5">Purchase Date</th>
                <th className="p-5">Workshop Name</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 p-6">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="text-center text-red-400 p-6">
                    {error}
                    <button
                      onClick={() => window.location.reload()}
                      className="ml-4 text-yellow-400 underline hover:text-yellow-300"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : filteredHistory.length > 0 ? (
                filteredHistory.map((record, index) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-800/60 transition-all border-b border-gray-700"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{record.productName}</td>
                    <td className="p-4">${record.productPrice?.toFixed(2)}</td>
                    <td className="p-4">{formatDate(record.createdAt)}</td>
                    <td className="p-4">{record.workshopName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 p-6">
                    No completed product purchases found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/80 text-yellow-400 text-center py-8 mt-10">
        <p className="text-base">© 2025 Road Repairs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Productpurchase;