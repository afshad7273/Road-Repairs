import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserLocation } from "../services/locationServices";

const Contactguest = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "Fetching location...",
    phone: "",
    vehicleModel: "",
    issue: "",
  });

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  // 📍 Get user's location on component mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const address = await getUserLocation(setCoordinates, setFormData);
        setFormData((prev) => ({ ...prev, address }));
      } catch (error) {
        console.error("Location Error:", error);
        setFormData((prev) => ({
          ...prev,
          address: "Unable to fetch location",
        }));
      }
    };

    fetchLocation();
  }, []);

  // 📩 Submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Complaint Registered Successfully! ✅");
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-blue-950 text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-950 p-6 text-lg shadow-lg w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/images/service-2.png"
              alt="Icon"
              className="w-10 h-10"
            />
            <h1 className="text-3xl font-bold text-yellow-400">Road Repairs</h1>
          </div>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                to="/welcomesection"
                className="hover:text-yellow-400 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/aboutguest"
                className="hover:text-yellow-400 transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/serviceguest"
                className="hover:text-yellow-400 transition"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/findlocation"
                className="hover:text-yellow-400 transition"
              >
                Find Nearest Service
              </Link>
            </li>
            <li>
              <Link
                to="/contactguest"
                className="hover:text-yellow-400 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contact Section */}
      <main className="flex-grow py-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-yellow-400">
            Register Your Complaint
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            Fill out the form to report your issue.
          </p>
        </div>

        {/* Grid Layout for Map & Form */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-gray-900 p-8 rounded-lg shadow-lg mt-10">
          {/* Left: Google Map */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
              Your Location
            </h3>
            {coordinates.lat && coordinates.lng ? (
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${coordinates.lat},${coordinates.lng}&zoom=15`}
                className="w-full h-64 rounded-lg shadow-lg"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            ) : (
              <p className="text-gray-400">Loading map...</p>
            )}
          </div>

          {/* Right: Complaint Form */}
          <div>
            <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
              Complaint Form
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="p-2 w-full bg-gray-800 border-2 border-gray-600 rounded-lg"
                required
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                readOnly
                className="p-2 w-full bg-gray-700 border-2 border-gray-600 rounded-lg text-gray-400"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="p-2 w-full bg-gray-800 border-2 border-gray-600 rounded-lg"
                required
              />
              <input
                type="text"
                name="vehicleModel"
                placeholder="Vehicle Model"
                value={formData.vehicleModel}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleModel: e.target.value })
                }
                className="p-2 w-full bg-gray-800 border-2 border-gray-600 rounded-lg"
                required
              />
              <textarea
                name="issue"
                placeholder="Describe Your Issue"
                value={formData.issue}
                onChange={(e) =>
                  setFormData({ ...formData, issue: e.target.value })
                }
                className="p-2 w-full bg-gray-800 border-2 border-gray-600 rounded-lg h-32"
                required
              ></textarea>

              {/* ✅ Correct Button */}
              <button
                type="submit"
                className="w-full p-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg text-lg transition"
              >
                Register Complaint
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 bg-gray-950 text-yellow-400 w-full text-center">
        <p className="text-lg mt-6">&copy; 2025 Road Repairs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contactguest;
