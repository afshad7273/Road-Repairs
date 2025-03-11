import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    customername: "",
    username: "",
    password: "",
    password_confirmation: "",
    phonenumber: "",
    district: "",
    location: "",
    email: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration successful!");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/images/4sign.webp')` }} // Set your image path
    >
      {/* Form Container with a Semi-Transparent Background */}
      <div className="w-full max-w-2xl p-12 rounded-2xl shadow-xl border border-white/30 
                      bg-white/60 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Create an Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Username Fields */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { name: "customername", label: "Full Name", placeholder: "👤 Enter your full name" }, 
              { name: "username", label: "Username", placeholder: "📛 Choose a username" }
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-md font-medium text-black">{label}</label>
                <input 
                  type="text"
                  name={name}
                  className="w-full p-3 border border-gray-500 rounded-lg text-black bg-white" 
                  placeholder={placeholder} 
                />
              </div>
            ))}
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { name: "password", label: "Password", placeholder: "🔒 Enter a strong password" }, 
              { name: "password_confirmation", label: "Confirm Password", placeholder: "🔑 Re-enter your password" }
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-md font-medium text-black">{label}</label>
                <input 
                  type="password"
                  name={name}
                  className="w-full p-3 border border-gray-500 rounded-lg text-black bg-white"
                  placeholder={placeholder} 
                />
              </div>
            ))}
          </div>

          {/* Phone Number & District Fields */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { name: "phonenumber", label: "Phone No.", placeholder: "📞 Enter number" }, 
              { name: "district", label: "District", placeholder: "🌍 Enter your district" }
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-md font-medium text-black">{label}</label>
                <input 
                  type="text"
                  name={name}
                  className="w-full p-3 border border-gray-500 rounded-lg text-black bg-white"
                  placeholder={placeholder} 
                />
              </div>
            ))}
          </div>

          {/* Location & Email Fields */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { name: "location", label: "Location", placeholder: "📍 Enter your location" },
              { name: "email", label: "Email", placeholder: "✉️ Enter email" }
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-md font-medium text-black">{label}</label>
                <input 
                  type="text"
                  name={name}
                  className="w-full p-3 border border-gray-500 rounded-lg text-black bg-white"
                  placeholder={placeholder} 
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-gray-800 to-black text-white p-3 rounded-lg mt-4 hover:shadow-lg hover:from-gray-900 hover:to-black transition-all duration-300">
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-md mt-4 text-black">
            Already have an account? <a href="/login" className="text-black font-bold hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
