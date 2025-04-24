import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBreakdownByIdAPI } from "../services/breakdownServices";
import { makePaymentAPI } from "../services/paymentServices";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ breakdownId }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [paymentMethod, setPaymentMethod] = useState("card"); // Default to card maybe? Or ""
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // General API errors
    const [cardError, setCardError] = useState(null); // Stripe CardElement errors
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const {data:breakdownData}=useQuery({
        queryFn:()=>getBreakdownByIdAPI(breakdownId),
        queryKey:["get-breakdown-by-API"]
    })
    
    const {mutateAsync} =useMutation({
        mutationFn:makePaymentAPI,
        mutationKey:['payment-breakdown']
    })

    // --- Handle Card Element Changes ---
    const handleCardChange = (event) => {
        if (event.error) {
            setCardError(event.error.message);
        } else {
            setCardError(null);
        }
    };

    // --- Handle Form Submission ---
    const handlePaymentSubmit = async () => {
        if (!paymentMethod) {
            setError("Please select a payment method.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setCardError(null);

        try {
            let response;
            if (paymentMethod === "card") {
                if (!stripe || !elements) {
                    throw new Error("Stripe is not initialized yet.");
                }
                const cardElement = elements.getElement(CardElement);
                if (!cardElement) {
                     throw new Error("Card details element not found.");
                }

                // 1. Create Stripe Token
                const { error: tokenError, token } = await stripe.createToken(cardElement);
                if (tokenError) {
                    setCardError(tokenError.message || "Invalid card details.");
                    setIsLoading(false);
                    return; // Stop processing
                }

                console.log('Stripe Token:', token.id);
                
                response = await mutateAsync({breakdownId,token:token.id,paymentMethod})

            } else if (paymentMethod === "cash") {
                 // **IMPORTANT**: Replace '/api/payments/create' with your actual backend endpoint
                 response = await mutateAsync({breakdownId,paymentMethod})
            }

            // 3. Handle Success
            console.log("Payment response:", response.data);
            setPaymentSuccess(true);
            // Optionally navigate after a short delay
            setTimeout(() => {
                 // **IMPORTANT**: Navigate to an appropriate success page or service history
                navigate("/servicehistguest"); // Or maybe a dedicated success page
            }, 1500); // 1.5 second delay

        } catch (err) {
             // 4. Handle Errors (Backend or Stripe)
            console.error("Payment failed:", err);
            const message = err.response?.data?.message || err.message || "An unexpected error occurred.";
            setError(`Payment Failed: ${message}`);
        } finally {
             // Ensure loading state is turned off even if navigation happens quickly
             if (!paymentSuccess) { // Only set loading false if not already successful (to avoid flicker)
                setIsLoading(false);
             }
        }
    };

    // --- UI Rendering ---

    if (paymentSuccess) {
         return (
             <div className="text-center p-10">
                 <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 <h3 className="text-2xl font-semibold mb-2 text-green-400">Payment Successful!</h3>
                 <p className="text-gray-400">Redirecting you shortly...</p>
             </div>
         );
    }
    
    return (
        <div className="max-w-xl w-full p-6 md:p-8 bg-black/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-800">
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400 text-center tracking-wide">
                Payment
            </h2>

            {/* Breakdown Summary */}
            <div className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700 text-center">
                <p className="text-sm text-gray-400">Paying for Breakdown ID:</p>
                <p className="text-lg font-medium text-gray-200 mb-1">{breakdownData?._id}</p>
                <p className="text-sm text-gray-400">Workshop:</p>
                <p className="text-lg font-medium text-gray-200 mb-2">{breakdownData?.assignedWorkshop.businessName}</p>
                <p className="text-2xl font-bold text-yellow-400">
                    Amount: ₹{breakdownData?.amount.toFixed(2)}
                </p>
            </div>

            {/* General Error Display Area */}
             {error && !paymentSuccess && (
                <div className="mb-4 p-3 text-center bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
                    {error}
                </div>
             )}

            {/* Payment Method Selection */}
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-4 text-gray-300">Choose Payment Method</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Card Button */}
                    <button
                        onClick={() => { setPaymentMethod("card"); setError(null); }}
                        className={`flex items-center justify-center p-4 border rounded-xl transition-all duration-300 text-base font-medium ${
                            paymentMethod === "card"
                            ? "bg-blue-600 border-blue-500 shadow-md ring-2 ring-blue-400 ring-offset-2 ring-offset-black/70"
                            : "border-gray-700 hover:bg-gray-800 hover:border-gray-600"
                        }`}
                    >
                        Credit/Debit Card
                    </button>
                    {/* COD Button */}
                    <button
                        onClick={() => { setPaymentMethod("cash"); setError(null); setCardError(null); }}
                        className={`flex items-center justify-center p-4 border rounded-xl transition-all duration-300 text-base font-medium ${
                            paymentMethod === "cash"
                            ? "bg-blue-600 border-blue-500 shadow-md ring-2 ring-blue-400 ring-offset-2 ring-offset-black/70"
                            : "border-gray-700 hover:bg-gray-800 hover:border-gray-600"
                        }`}
                    >
                        Cash on Delivery
                    </button>
                </div>
            </div>

            {/* Card Details Section */}
            {paymentMethod === "card" && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 text-gray-300">Enter Card Details</h3>
                    <div className="bg-gray-800/60 backdrop-blur-md p-5 rounded-xl shadow-lg border border-gray-700">
                        {/* Stripe Card Element */}
                        <CardElement
                             options={cardElementOptions}
                             onChange={handleCardChange}
                             className="p-4 border border-gray-600 rounded-lg bg-gray-900 text-white" // Basic styling
                        />
                         {/* Card Error Display Area */}
                         {cardError && (
                            <div className="mt-2 text-sm text-red-400">{cardError}</div>
                         )}
                         <p className="text-xs text-gray-500 mt-3 text-center">Secure payment powered by Stripe</p>
                    </div>
                </div>
            )}

            {/* Cash on Delivery Info */}
            {paymentMethod === "cash" && (
                <div className="mb-6 p-4 text-center bg-gray-800/50 rounded-xl border border-gray-700">
                    <p className="text-gray-300">You have selected Cash on Delivery.</p>
                    <p className="text-gray-400 text-sm">Please pay the workshop upon service completion.</p>
                </div>
            )}

            {/* Confirm Payment Button */}
            <button
                onClick={handlePaymentSubmit}
                disabled={isLoading || !paymentMethod || (paymentMethod === 'card' && (!stripe || !elements || !!cardError))} // Disable if loading, no method, or card issues
                className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                    !isLoading ? 'hover:from-purple-600 hover:to-blue-500' : ''
                }`}
            >
                {isLoading
                    ? ( <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span> )
                    : (paymentMethod === 'card' ? `Pay ₹${breakdownData?.amount.toFixed(2)}` : 'Confirm Cash Payment')
                }
            </button>
        </div>
    );
};


// --- Main Component Wrapper with Elements Provider ---
const MakePayment = () => {
    const { id } = useParams();
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
            {/* Stripe Elements Provider wraps the form */}
            <Elements stripe={stripePromise}>
                <PaymentForm breakdownId={id} />
            </Elements>
        </div>
    );
};

// --- Styling Options for Stripe Card Element ---
const cardElementOptions = {
  style: {
    base: {
      color: '#ffffff', // Text color
      fontFamily: 'ui-sans-serif, system-ui, sans-serif', // Match Tailwind's default sans font
      fontSize: '16px',
      '::placeholder': {
        color: '#6b7280', // Gray-500 for placeholder
      },
      iconColor: '#6b7280', // Color for icons like Visa/Mastercard
    },
    invalid: {
      color: '#f87171', // Red-400 for errors
      iconColor: '#f87171',
    },
  },
  // You can hide the postal code if not needed for your region/setup
  // hidePostalCode: true,
};

export default MakePayment;