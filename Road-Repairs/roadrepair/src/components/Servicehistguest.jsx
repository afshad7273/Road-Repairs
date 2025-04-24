import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyBreakdownsAPI, getBreakdownByIdAPI } from "../services/breakdownServices";

const Servicehistoryguest = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [breakdownDetails, setBreakdownDetails] = useState({});

    // Use react-query to fetch breakdowns
    const { data: serviceHistoryData, isLoading, isError, error } = useQuery({
        queryKey: ['my-breakdowns'],
        queryFn: getMyBreakdownsAPI,
    });

    const filteredHistory = useMemo(() => {
        return serviceHistoryData?.filter((record) =>
            record.issueType?.toLowerCase().includes(search.toLowerCase())
        ) || [];
    }, [serviceHistoryData, search]);

    useEffect(() => {
        const fetchDetails = async () => {
            let details = {};
            for (let record of filteredHistory) {
                const breakdown = await getBreakdownByIdAPI(record._id);
                details[record._id] = breakdown;
            }
            setBreakdownDetails(details);
        };
        fetchDetails();
    }, [filteredHistory]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

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
                        {/* <li><Link to="/About guest" className="hover:text-yellow-400 transition">About</Link></li> */}
                        <li><Link to="/service guest" className="hover:text-yellow-400 transition">Services</Link></li>
                        <li><Link to="/findlocation" className="hover:text-yellow-400 transition">Find Service</Link></li>
                        <li><Link to="/servicehistguest" className="text-yellow-400 font-semibold underline">History</Link></li>
                        {/* <li><Link to="/reviewguest" className="hover:text-yellow-400 transition">Review</Link></li> */}
                        <li><Link to="/profilecust" className="hover:text-yellow-400 transition">Profile</Link></li>
                        <li><Link to="/productpurchase" className="hover:text-yellow-400 transition">Product History</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow py-12 px-6">
                <div className="max-w-5xl mx-auto text-center mb-10">
                    <h2 className="text-4xl font-bold text-yellow-400">Complaint History</h2>
                    <p className="mt-4 text-lg text-gray-300">Review your previous car service records</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Search service type..."
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Service History Table */}
                <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-yellow-400 text-gray-900 text-left text-lg">
                                <th className="p-5">Date</th>
                                <th className="p-5">Issue</th>
                                <th className="p-5">Amount</th>
                                <th className="p-5">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHistory.length > 0 ? (
                                filteredHistory.map((record) => {
                                    const breakdown = breakdownDetails[record._id];
                                    let statusButton;
                                    let amountDisplay = "";

                                    if (breakdown?.status === "completed" && breakdown?.paymentStatus === "pending") {
                                        statusButton = (
                                            <button className={`p-2 rounded bg-red-400 text-white`} onClick={() => navigate(`/paymentcust/${record._id}`)}>
                                                Pay Now
                                            </button>
                                        );
                                        amountDisplay = breakdown?.amount;
                                    } else if (breakdown?.status === "completed" && breakdown?.paymentStatus === "paid") {
                                        statusButton = (
                                            <button className={`p-2 rounded bg-green-400 text-white`} onClick={() => navigate(`/reviewguest/${record._id}`)}>
                                                Review
                                            </button>
                                        );
                                        amountDisplay = breakdown?.amount;
                                    } else if (breakdown?.paymentStatus === "pending") {
                                        statusButton = <button className={`p-2 rounded bg-yellow-400 text-black`}>Pending</button>;
                                    } else {
                                        statusButton = (
                                            <button className={`p-2 rounded text-white`}>
                                                Loading
                                            </button>
                                        );
                                        amountDisplay = breakdown?.amount;
                                    }

                                    return (
                                        <tr key={record._id} className="hover:bg-gray-800/60 transition-all border-b border-gray-700">
                                            <td className="p-4">{new Date(record.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4">{record.issueType}</td>
                                            <td className="p-4">{amountDisplay}</td>
                                            <td className="p-4">{statusButton}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-gray-400 p-6">No matching records found</td>
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

export default Servicehistoryguest;