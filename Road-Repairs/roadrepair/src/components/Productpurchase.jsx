import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Productpurchase = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authentication token not found. Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    "https://road-repairs.onrender.com/api/orders/customer",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setPurchases(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to fetch purchase history. Please try again."
                );
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                <p className="text-xl">Loading purchase history...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
                <p className="text-red-500 text-xl mb-4">{error}</p>
                <Link to="/login" className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300">
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-black min-h-screen flex flex-col text-white">
            {/* Navbar (assuming you have a consistent navbar) */}
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

            <main className="flex-grow py-12 px-6">
                <div className="max-w-5xl mx-auto text-center mb-10">
                    <h2 className="text-4xl font-bold text-yellow-400">Your Purchase History</h2>
                    <p className="mt-4 text-lg text-gray-300">Review your completed product purchases</p>
                </div>

                <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-yellow-400 text-gray-900 text-left text-lg">
                                <th className="p-5">Serial No</th>
                                <th className="p-5">Product Name</th>
                                <th className="p-5">Price</th>
                                <th className="p-5">Purchase Date</th>
                                <th className="p-5">Workshop</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.length > 0 ? (
                                purchases.map((record, index) => (
                                    <tr key={record.id} className="hover:bg-gray-800/60 transition-all border-b border-gray-700">
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
                                        No purchase history found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            <footer className="bg-black/80 text-yellow-400 text-center py-8 mt-10">
                <p className="text-base">© 2025 Road Repairs. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Productpurchase;