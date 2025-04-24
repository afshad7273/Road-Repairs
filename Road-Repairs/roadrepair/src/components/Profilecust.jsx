import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { profileAPI } from "../services/userServices";
import axios from "axios";

// Reverse Geocoding Function (Remains in this file as it might be specific to this component)
const reverseGeocode = async (lat, lng) => {
  try {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    );

    if (response.data.status === "OK" && response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    } else {
      return "Location Not Found"; // Explicitly return a message
    }
  } catch (error) {
    console.error("Reverse Geocoding Error:", error);
    return "Error Fetching Location"; // Return a message indicating an error
  }
};

const Profilecust = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile-view"],
    queryFn: async () => {
      const profileData = await profileAPI();
      // Reverse geocode location if coordinates exist
      if (profileData.location?.coordinates) {
        const [lng, lat] = profileData.location.coordinates;
        profileData.location = await reverseGeocode(lat, lng);
      } else {
        profileData.location = "N/A"; // Or some other default value
      }
      return profileData;
    },
  });

  if (isLoading) {
    return <div className="text-center text-yellow-400 mt-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 mt-10">Error fetching profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-950 p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-400">Road Repairs</h1>
          <ul className="flex space-x-6">
            <li>
              <Link to="/welcomesection" className="hover:text-yellow-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/profilecust" className="hover:text-yellow-400">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto bg-gray-800 p-8 mt-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-yellow-400 text-center">My Profile</h2>

        <div className="mt-6 space-y-4">
          {[
            { label: "Full Name", value: data.name },
            { label: "Email Address", value: data.email },
            { label: "Phone Number", value: data.phone },
            { label: "Location", value: data.location },
          ].map(({ label, value }) => (
            <div key={label}>
              <label className="block text-lg text-yellow-400">{label}</label>
              <p className="w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600">
                {value || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profilecust;
