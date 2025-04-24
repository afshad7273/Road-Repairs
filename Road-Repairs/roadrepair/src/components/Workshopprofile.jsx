import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../utils/urls";
import { motion } from "framer-motion";

// Reverse Geocoding Function
const reverseGeocode = async (lat, lng) => {
  try {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    );

    if (response.data.status === "OK" && response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    }
  } catch (error) {
    console.error("Reverse Geocoding Error:", error);
  }
  return "Unknown Location";
};

// Fetch Workshop Profile API
const fetchWorkshopProfile = async () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated.");
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.location?.coordinates) {
      const [lng, lat] = data.location.coordinates;
      data.location = await reverseGeocode(lat, lng);
    }

    return data;
  } catch (error) {
    console.error("Fetch Profile Error:", error.response?.data || error.message);
    throw error;
  }
};

// Update Workshop Profile API
const updateWorkshopProfile = async (updatedData) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated.");
  }

  const cleanedData = {};
  for (const [key, value] of Object.entries(updatedData)) {
    if (value !== undefined && value !== null) {
      cleanedData[key] = value;
    }
  }

  if (!Object.keys(cleanedData).length) {
    throw new Error("No valid data to update.");
  }

  console.log("Sending update to:", `${BASE_URL}/user/profile`);
  console.log("Cleaned update data:", cleanedData);
  console.log("Token:", token);

  try {
    const { data } = await axios.put(`${BASE_URL}/user/profile`, cleanedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Update response:", data);
    return data;
  } catch (error) {
    console.error("Update Profile Error:", error.response?.data || error.message);
    throw error;
  }
};

const WorkshopProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = React.useState(false);
  const [editedData, setEditedData] = React.useState({});

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["workshop-profile"],
    queryFn: fetchWorkshopProfile,
  });

  const updateMutation = useMutation({
    mutationFn: updateWorkshopProfile,
    onSuccess: (data) => {
      console.log("Update successful:", data);
      queryClient.invalidateQueries({ queryKey: ["workshop-profile"] });
      setEditMode(false);
      setEditedData({});
    },
    onError: (error) => {
      console.error("Update Mutation Error:", error);
      alert(`Failed to save changes: ${error.response?.data?.message || error.message}`);
    },
  });

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value.trim() || undefined,
    }));
  };

  const handleServiceChange = (index, value) => {
    const updatedServices = [...(editedData.servicesOffered || data?.servicesOffered || [])];
    updatedServices[index] = value.trim() || undefined;
    setEditedData((prev) => ({ ...prev, servicesOffered: updatedServices }));
  };

  const handleSave = () => {
    const validData = Object.fromEntries(
      Object.entries(editedData).filter(([_, value]) => value !== undefined && value !== "")
    );

    if (!Object.keys(validData).length) {
      console.log("No valid changes to save");
      setEditMode(false);
      return;
    }

    console.log("Saving data:", validData);
    updateMutation.mutate(validData);
  };

  const handleCancel = () => {
    setEditedData({});
    setEditMode(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div
          className="text-2xl font-semibold text-gold-400 animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div
          className="text-2xl font-semibold text-red-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Error fetching profile: {error.message}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Navbar */}
      <nav className="bg-navy-900 py-5 px-6 shadow-xl">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-serif font-bold text-gold-400 tracking-wide">Road Repairs</h1>
          <div className="flex space-x-8">
            {[
              { to: "/workhome", label: "Home" },
              { to: "/servicework", label: "Complaints" },
              { to: "/products", label: "Products" },
              { to: "/viewproducts", label: "View Products" },
            ].map((item) => (
              <Link key={item.label} to={item.to}>
                <button className="text-lg font-medium text-gray-200 hover:text-gold-300 hover:shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-all duration-300">
                  {item.label}
                </button>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="text-lg font-medium text-gray-200 hover:text-gold-300 hover:shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <section className="flex-grow flex items-center justify-center py-16 px-4">
        <motion.div
          className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-3xl border border-gray-100/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-5xl font-serif font-bold text-navy-800 text-center mb-10 tracking-tight">
            Workshop Profile
          </h2>
          <div className="space-y-8">
            {editMode ? (
              <>
                <InputField
                  label="Business Name"
                  name="businessName"
                  value={editedData.businessName || data.businessName || ""}
                  onChange={handleChange}
                />
                <InputField
                  label="Email"
                  name="email"
                  value={editedData.email || data.email || ""}
                  onChange={handleChange}
                />
                <InputField
                  label="Phone"
                  name="phone"
                  value={editedData.phone || data.phone || ""}
                  onChange={handleChange}
                />
                <InputField
                  label="Address"
                  name="location"
                  value={editedData.location || data.location || ""}
                  onChange={handleChange}
                />
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-3">Services Offered</label>
                  <ul className="space-y-4">
                    {(editedData.servicesOffered || data.servicesOffered || []).map((service, index) => (
                      <input
                        key={index}
                        type="text"
                        className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50/50 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-300 placeholder-gray-400"
                        value={service || ""}
                        onChange={(e) => handleServiceChange(index, e.target.value)}
                        placeholder={`Service ${index + 1}`}
                      />
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <strong className="text-navy-700 font-semibold">Business Name:</strong>
                  <p className="text-navy-900 mt-1">{data.businessName || "N/A"}</p>
                </div>
                <div>
                  <strong className="text-navy-700 font-semibold">Email:</strong>
                  <p className="text-navy-900 mt-1">{data.email || "N/A"}</p>
                </div>
                <div>
                  <strong className="text-navy-700 font-semibold">Phone:</strong>
                  <p className="text-navy-900 mt-1">{data.phone || "N/A"}</p>
                </div>
                <div>
                  <strong className="text-navy-700 font-semibold">Address:</strong>
                  <p className="text-navy-900 mt-1">{data.location || "N/A"}</p>
                </div>
                <div className="md:col-span-2">
                  <strong className="text-navy-700 font-semibold">Services Offered:</strong>
                  <ul className="list-disc pl-6 mt-2 text-navy-900">
                    {(data.servicesOffered || []).map((service, index) => (
                      <li key={index} className="py-1">{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-6 mt-12">
              {editMode ? (
                <>
                  <motion.button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-gold-400 to-gold-600 text-navy-900 px-8 py-3 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] disabled:from-gold-300 disabled:to-gold-400 disabled:cursor-not-allowed disabled:text-navy-700 transition-all duration-300"
                    disabled={updateMutation.isPending}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {updateMutation.isPending ? "Saving..." : "Save"}
                  </motion.button>
                  <motion.button
                    onClick={handleCancel}
                    className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-3 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-900 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] disabled:from-gray-400 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300"
                    disabled={updateMutation.isPending}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => {
                    setEditedData({
                      businessName: data.businessName || "",
                      email: data.email || "",
                      phone: data.phone || "",
                      location: data.location || "",
                      servicesOffered: data.servicesOffered || [],
                    });
                    setEditMode(true);
                  }}
                  className="bg-gradient-to-r from-gold-400 to-gold-600 text-navy-900 px-8 py-3 rounded-xl font-semibold hover:from-gold-500 hover:to-gold-700 hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Edit Profile
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 py-6 text-center">
        <p className="text-sm font-medium text-gray-300">© 2025 AutoAssist. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Reusable input component
const InputField = ({ label, name, value, onChange }) => (
  <div className="relative">
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50/50 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-300 peer placeholder-transparent"
      placeholder={label}
      id={name}
    />
    <label
      htmlFor={name}
      className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-navy-700 transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold-500 peer-valid:top-2 peer-valid:text-xs peer-valid:text-gold-500"
    >
      {label}
    </label>
  </div>
);

export default WorkshopProfile;