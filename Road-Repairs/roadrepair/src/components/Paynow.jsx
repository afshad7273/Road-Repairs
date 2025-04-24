import React, { useState, useEffect } from 'react';
import { useLocation, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PayNow = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [searchParams] = useSearchParams();
    const selectedItems = state?.selectedItems || [];
    const totalAmount = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handle redirect from Stripe Checkout (and now internal success/failure)
    useEffect(() => {
        const successParam = searchParams.get('success');
        const orderIdParam = searchParams.get('orderId');

        if (successParam === 'true' && orderIdParam) {
            setOrderId(orderIdParam);
            setPaymentSuccess(true);
            setTimeout(() => {
                setPaymentSuccess(false);
                setOrderId(null);
                navigate('/productpurchase');
                window.history.replaceState({}, '', '/paynow');
            }, 2500);
        } else if (successParam === 'false' && orderIdParam) {
            setOrderId(orderIdParam);
            setPaymentError('Payment was canceled or failed');
            setTimeout(() => {
                setPaymentError(null);
                setOrderId(null);
                window.history.replaceState({}, '', '/paynow');
            }, 5000);
        }
    }, [searchParams, navigate]);

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (paymentMethod === 'cash') {
                const response = await axios.post(
                    'https://road-repairs.onrender.com/api/v1/payments/create-checkout',
                    {
                        items: selectedItems.map((item) => ({
                            productId: item._id,
                            quantity: item.quantity,
                            totalPrice: item.totalPrice,
                        })),
                        paymentMethod: 'cash',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                        }
                    }
                );
                setOrderId(response.data.orderId);
                setPaymentSuccess(true);
                setTimeout(() => {
                    setIsPaymentModalOpen(false);
                    setPaymentSuccess(false);
                    setPaymentMethod('card');
                    setOrderId(null);
                    navigate('/productpurchase');
                }, 2500);
            } else {
                const stripe = await stripePromise;
                const response = await axios.post(
                    'https://road-repairs.onrender.com/api/v1/order/create-checkout',
                    {
                        items: selectedItems.map((item) => ({
                            productId: item._id,
                            quantity: item.quantity,
                            totalPrice: item.totalPrice,
                        })),
                        paymentMethod,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                        },
                    }
                );
                const { sessionId } = response.data;
                await stripe.redirectToCheckout({ sessionId });
            }
        } catch (err) {
            console.error('Payment Error:', err);
            setPaymentError(err.response?.data?.message || 'Payment initiation failed');
            setTimeout(() => setPaymentError(null), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    // Render Success Message
    if (paymentSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-gray-900 to-blue-950 flex items-center justify-center p-4">
                <div className="text-center p-10 bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-400/20 animate-fade-in">
                    <svg
                        className="w-16 h-16 mx-auto text-green-500 mb-4 animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <h3 className="text-3xl font-extrabold text-green-400 mb-2 drop-shadow-lg">
                        Payment Successful!
                    </h3>
                    <p className="text-gray-300">Thank you for your payment.</p>
                </div>
            </div>
        );
    }

    // Render Failure Message
    if (paymentError) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-gray-900 to-red-900 flex items-center justify-center p-4">
                <div className="text-center p-10 bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-red-400/20 animate-fade-in">
                    <svg
                        className="w-16 h-16 mx-auto text-red-500 mb-4 animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <h3 className="text-3xl font-extrabold text-red-400 mb-2 drop-shadow-lg">
                        Payment Failed!
                    </h3>
                    <p className="text-gray-300">{paymentError}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-gray-900 to-blue-950 text-white min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-950 p-6 text-lg shadow-xl w-full">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold text-yellow-400 tracking-tight drop-shadow-md">
                        Order Summary
                    </h1>
                    <Link to="/productpurchase">
                        <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-lg shadow-md hover:from-yellow-600 hover:to-yellow-700 transition transform hover:scale-105">
                            Back to Purchase
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="py-12 px-4 sm:px-8 flex-grow">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-yellow-400 text-center mb-10 tracking-wide drop-shadow-lg">
                        Your Order Details
                    </h2>
                    {selectedItems.length > 0 ? (
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-yellow-400/20">
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 text-left text-lg font-semibold">
                                            <th className="p-5">Image</th>
                                            <th className="p-5">Product Name</th>
                                            <th className="p-5">Quantity</th>
                                            <th className="p-5">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedItems.map((item) => (
                                            <tr
                                                key={item._id}
                                                className="hover:bg-gray-800/30 transition-all border-b border-gray-700/50"
                                            >
                                                <td className="p-4">
                                                    <img
                                                        src={item.image || '/images/placeholder.jpg'}
                                                        alt={item.productName}
                                                        className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-lg shadow-md transition-transform hover:scale-105"
                                                    />
                                                </td>
                                                <td className="p-4 font-medium text-base sm:text-lg">{item.productName}</td>
                                                <td className="p-4 font-semibold text-base sm:text-lg">{item.quantity}</td>
                                                <td className="p-4 font-semibold text-yellow-400 text-base sm:text-lg">
                                                    ${item.totalPrice.toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-6 bg-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <p className="text-xl sm:text-2xl font-bold text-yellow-400 drop-shadow-lg">
                                    Total Amount: ${totalAmount.toFixed(2)}
                                </p>
                                <button
                                    onClick={() => setIsPaymentModalOpen(true)}
                                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 text-lg font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition transform hover:scale-105 hover:shadow-xl"
                                    aria-label="Proceed to payment"
                                >
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 text-lg font-medium">
                            No items selected for order.
                        </p>
                    )}
                </div>
            </main>

            {/* Payment Modal */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md z-50 transition-opacity duration-500">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg relative transform transition-all duration-500 scale-100 hover:scale-102 border border-yellow-400/30">
                        <button
                            onClick={() => {
                                setIsPaymentModalOpen(false);
                                setPaymentMethod('card');
                                setPaymentError(null);
                                setOrderId(null);
                            }}
                            className="absolute top-4 right-4 text-gray-300 hover:text-yellow-400 transition transform hover:rotate-90"
                            aria-label="Close payment modal"
                        >
                            <FaTimes size={28} />
                        </button>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 text-center mb-6 sm:mb-8 tracking-tight drop-shadow-lg">
                            Secure Payment
                        </h3>

                        {/* Payment Method Selection */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-yellow-400 mb-4">Choose Payment Method</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`p-4 border rounded-xl transition-all duration-300 text-base font-medium ${
                                        paymentMethod === 'card'
                                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 shadow-md ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900'
                                            : 'border-gray-700 hover:bg-gray-800 hover:border-yellow-400/50 text-white'
                                    }`}
                                >
                                    Card / Google Pay / Apple Pay
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('cash')}
                                    className={`p-4 border rounded-xl transition-all duration-300 text-base font-medium ${
                                        paymentMethod === 'cash'
                                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 shadow-md ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900'
                                            : 'border-gray-700 hover:bg-gray-800 hover:border-yellow-400/50 text-white'
                                    }`}
                                >
                                    Cash on Hand
                                </button>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <form onSubmit={handlePaymentSubmit} className="space-y-6">
                            {paymentMethod === 'card' && (
                                <div className="p-4 text-center bg-gray-800/50 rounded-xl border border-yellow-400/50">
                                    <p className="text-yellow-400 font-semibold">Pay with Stripe</p>
                                    <p className="text-gray-300 text-sm mt-2">
                                        You will be redirected to Stripe’s secure checkout page.
                                    </p>
                                </div>
                            )}
                            {paymentMethod === 'cash' && (
                                <div className="p-4 text-center bg-gray-800/50 rounded-xl border border-yellow-400/50">
                                    <p className="text-yellow-400 font-semibold">Cash on Hand</p>
                                    <p className="text-gray-300 text-sm mt-2">
                                        Pay the workshop upon service completion.
                                    </p>
                                </div>
                            )}
                            <div className="flex gap-4 mt-6 sm:mt-8">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsPaymentModalOpen(false);
                                        setPaymentMethod('card');
                                        setPaymentError(null);
                                        setOrderId(null);
                                    }}
                                    className="flex-1 px-4 py-3 bg-gray-700/50 text-white rounded-xl hover:bg-gray-700 transition transform hover:scale-105"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition transform hover:scale-105 shadow-md"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? 'Processing...'
                                        : paymentMethod === 'cash'
                                            ? 'Confirm Cash Payment'
                                            : 'Proceed to Checkout'}
                                </button>
                            </div>
                        </form>

                        {/* Error Message */}
                        {paymentError && (
                            <p className="text-red-400 text-sm mt-4 text-center animate-pulse">
                                {paymentError}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gray-950 py-10 text-yellow-400 w-full text-center shadow-inner">
                <p className="text-lg font-medium">© 2025 Road Repairs. All rights reserved.</p>
            </footer>

            {/* Custom CSS for Animations */}
            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-in;
                }
                @keyframes fadeIn {
                    0% { opacity: 0; transform: scale(0.95); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default PayNow;