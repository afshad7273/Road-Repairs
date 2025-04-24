import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getWorkshopReviewsAPI } from '../services/reviewServices';
import { useSelector } from 'react-redux';
import { Star } from 'lucide-react';

const Workshopreview = () => {
  const [reviews, setReviews] = useState([]);
  const userToken = useSelector((state) => state.auth.token);

  const { data, isLoading, error } = useQuery({
    queryKey: ['workshopReviews'],
    queryFn: getWorkshopReviewsAPI,
  });

  useEffect(() => {
    if (data) setReviews(data);
    if (error) {
      toast.error(error.message || 'Failed to load reviews.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [data, error]);

  const navLinks = [
    { path: '/workhome', label: 'Home' },
    { path: '/servicework', label: 'Services' },
    { path: '/products', label: 'Add Products' },
    { path: '/viewproducts', label: 'View Products' },
    // { path: '/workshopreview', label: 'Reviews' },
  ];

  const renderStars = (rating) => (
    <div className="flex space-x-1 mt-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={20}
          className={`${
            i < rating ? 'text-yellow-400' : 'text-gray-300'
          } transition-transform duration-300`}
          fill={i < rating ? '#facc15' : 'none'}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <ToastContainer />
      <nav className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white p-5 flex flex-col items-center shadow-md">
        <h1 className="text-4xl font-extrabold mb-2 tracking-wide">Workshop Reviews</h1>
        <div className="flex space-x-4">
          {navLinks.map((link, i) => (
            <Link to={link.path} key={i}>
              <button className="text-white px-4 py-2 hover:text-gray-300 transition">{link.label}</button>
            </Link>
          ))}
        </div>
      </nav>

      {/* <header className="bg-gradient-to-br from-purple-700 to-indigo-700 text-white text-center py-16 shadow-lg">
        <h2 className="text-4xl font-bold">What Customers Say</h2>
        <p className="mt-3 text-lg">Building trust through transparent reviews ✨</p>
      </header> */}

      <main className="flex-grow py-12 px-4">
        {isLoading ? (
          <p className="text-center text-gray-500 text-xl">Loading reviews...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-xl">Error: {error.message}</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No reviews available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {reviews.map((review, idx) => (
              <div
                key={review._id}
                className="bg-white/60 backdrop-blur-md border border-white/30 shadow-xl rounded-xl p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                style={{ animation: `fadeInUp 0.5s ease ${idx * 0.1}s both` }}
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl font-semibold text-indigo-800">{review.user?.name || 'Anonymous'}</h3>
                  <span className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                {renderStars(review.rating)}
                <p className="mt-4 text-gray-700 italic">
                  "{review.comment || 'No comment provided'}"
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <section className="text-center py-12 bg-gradient-to-r from-purple-800 to-indigo-800 text-white">
        {/* <h2 className="text-3xl font-bold">Level Up Your Services</h2>
        <p className="mt-2 text-lg">Use your reviews to grow stronger 💪</p> */}
        <Link to="/servicework">
          <button className="mt-6 bg-white text-purple-700 px-6 py-3 font-semibold rounded-full shadow-md hover:bg-gray-100 transition">
            Back to Services
          </button>
        </Link>
      </section>

      <footer className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white text-center p-5">
        <p>© 2025 AutoAssist. All rights reserved.</p>
      </footer>

      {/* Fade-in animation style */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Workshopreview;
