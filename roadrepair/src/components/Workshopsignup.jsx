import { useState } from "react";
import { Link } from "react-router-dom";

const Workshopsignup = () => {
  const [formData, setFormData] = useState({
    workshopName: "",
    ownerName: "",
    email: "",
    phoneNumber: "",
    district: "",
    location: "",
    licenseNumber: "",
    gstNumber: "",
    password: "",
    password_confirmation: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Workshop registered successfully!");
  };

  return (
    <div 
      className="w-screen h-screen flex items-center justify-center bg-gray-900 bg-auto lg:bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/images/signup1.webp')" }}
    >
      <div className="w-full max-w-2xl p-12 rounded-2xl shadow-lg border border-white/30 
                      bg-white/30 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Register Your Workshop</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Workshop Name & Owner Name Fields */}
          <div className="grid grid-cols-2 gap-6">
            {[{ name: "workshopName", label: "Workshop Name", placeholder: "🏢 Enter workshop name" }, 
              { name: "ownerName", label: "Owner Name", placeholder: "👤 Enter owner's name" }].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-md font-medium text-black">{label}</label>
                <input 
                  type="text"
                  name={name}
                  className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white/50" 
                  placeholder={placeholder} 
                />
              </div>
            ))}
          </div>

          {/* Email & Phone Number Fields */}
          <div className="grid grid-cols-2 gap-6">
            {[{ name: "email", label: "Email", placeholder: "✉️ Enter email" }, 
              { name: "phoneNumber", label: "Phone No.", placeholder: "📞 Enter number" }].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-md font-medium text-black">{label}</label>
                <input 
                  type="text"
                  name={name}
                  className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white/50" 
                  placeholder={placeholder} 
                />
              </div>
            ))}
          </div>

          {/* District & Location Fields */}
          <div className="grid grid-cols-2 gap-6">
            {[{ name: "district", label: "District", placeholder: "🌍 Enter your district" },
              { name: "location", label: "Location", placeholder: "📍 Enter your location" }].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-md font-medium text-black">{label}</label>
                <input 
                  type="text"
                  name={name}
                  className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white/50" 
                  placeholder={placeholder} 
                />
              </div>
            ))}
          </div>

          {/* License Number & GST Number Fields */}
          <div className="grid grid-cols-2 gap-6">
            {[{ name: "licenseNumber", label: "License Number", placeholder: "📜 Enter license number" },
              { name: "gstNumber", label: "GST Number", placeholder: "💰 Enter GST number" }].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-md font-medium text-black">{label}</label>
                <input 
                  type="text"
                  name={name}
                  className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white/50" 
                  placeholder={placeholder} 
                />
              </div>
            ))}
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-2 gap-6">
            {[{ name: "password", label: "Password", placeholder: "🔒 Enter a strong password" }, 
              { name: "password_confirmation", label: "Confirm Password", placeholder: "🔑 Re-enter your password" }].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-md font-medium text-black">{label}</label>
                <input 
                  type="password"
                  name={name}
                  className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white/50"
                  placeholder={placeholder} 
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-gray-900 to-black text-white p-3 rounded-lg mt-4 hover:shadow-lg hover:from-gray-800 hover:to-black transition-all duration-300">
            Register Workshop
          </button>

          {/* Login Link */}
          <p className="text-center text-md mt-4 text-black">
            Already have an account? <Link to="/workshoplogin" className="text-black font-bold hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Workshopsignup;
