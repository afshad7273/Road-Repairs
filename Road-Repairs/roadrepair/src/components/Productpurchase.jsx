import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

// Dummy data for purchased products
const dummyPurchases = [
  {
    _id: '1',
    productName: 'Car Tire',
    productPrice: 99.99,
    createdAt: '2025-04-20T10:00:00Z',
  },
  {
    _id: '2',
    productName: 'Brake Pad',
    productPrice: 49.99,
    createdAt: '2025-04-19T15:30:00Z',
  },
  {
    _id: '3',
    productName: 'Oil Filter',
    productPrice: 19.99,
    createdAt: '2025-04-18T09:00:00Z',
  },
  {
    _id: '4',
    productName: 'Air Filter',
    productPrice: 29.99,
    createdAt: '2025-04-17T12:00:00Z',
  },
];

const Productpurchase = () => {
  const [search, setSearch] = useState("");

  const filteredHistory = useMemo(() => {
    return dummyPurchases.filter((record) =>
      record.productName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
            <li><Link to="/welcomesection" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link to="/service guest" className="hover:text-yellow-400 transition">Services</Link></li>
            <li><Link to="/findlocation" className="hover:text-yellow-400 transition">Find Service</Link></li>
            <li><Link to="/producthistory" className="text-yellow-400 font-semibold underline">History</Link></li>
            <li><Link to="/profilecust" className="hover:text-yellow-400 transition">Profile</Link></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow py-12 px-6">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold text-yellow-400">Product Purchase History</h2>
          <p className="mt-4 text-lg text-gray-300">Review your previous product purchases</p>
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
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((record, index) => (
                  <tr key={record._id} className="hover:bg-gray-800/60 transition-all border-b border-gray-700">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{record.productName}</td>
                    <td className="p-4">${record.productPrice.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-gray-400 p-6">No matching records found</td>
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