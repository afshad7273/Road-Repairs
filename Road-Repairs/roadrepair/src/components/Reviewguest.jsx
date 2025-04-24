import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { submitReviewAPI } from "../services/reviewServices";
import { getBreakdownByIdAPI } from "../services/breakdownServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reviewguest = () => {
  const { breakdownId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [description, setDescription] = useState("");

  console.log("breakdownId from params:", breakdownId); // Log the param

  // Fetch breakdown details only if breakdownId is valid
  const { data: breakdown, isLoading, isError, error } = useQuery({
    queryKey: ["breakdown", breakdownId],
    queryFn: () => getBreakdownByIdAPI(breakdownId),
    enabled: !!breakdownId, // Only run query if breakdownId exists
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: submitReviewAPI,
    mutationKey: ["submit-review"],
    onSuccess: () => {
      toast.success("🎉 Review submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/servicehistguest"), 3000);
    },
    onError: (error) => {
      toast.error(`❌ Failed to submit review: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating", { position: "top-right", autoClose: 3000 });
      return;
    }

    if (!breakdownId) {
      toast.error("No breakdown specified", { position: "top-right", autoClose: 3000 });
      return;
    }

    if (!breakdown?.assignedWorkshop) {
      toast.error("No workshop assigned to this breakdown", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (breakdown.paymentStatus !== "paid") {
      toast.error("Payment must be completed before reviewing", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      await mutateAsync({
        workshopId: breakdown.assignedWorkshop,
        rating,
        comment: description,
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!breakdownId) {
    return <p className="text-red-500 text-center mt-20">Error: No breakdown ID provided</p>;
  }
  if (isLoading) return <p className="text-white text-center mt-20">Loading...</p>;
  if (isError) return <p className="text-red-500 text-center mt-20">Error: {error.message}</p>;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-black min-h-screen flex flex-col text-white">
      <ToastContainer />
      <div className="max-w-md mx-auto mt-20 p-6 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Rate Your Service</h2>

        <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <button
                key={index}
                type="button"
                disabled={isPending}
                className={`text-3xl mx-1 ${
                  ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(rating)}
              >
                ★
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
            placeholder="Write your description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            disabled={isPending}
          />
          <button
            type="submit"
            className={`w-full p-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition ${
              isPending || rating === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPending || rating === 0}
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </button>
        </form>

        <button
          onClick={() => navigate("/servicehistguest")}
          className="w-full p-3 mt-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          disabled={isPending}
        >
          Back to History
        </button>
      </div>
    </div>
  );
};

export default Reviewguest;