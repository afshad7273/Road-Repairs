import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { registerAPI } from "../services/userServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const { mutateAsync } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["signup"],
  });

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    customername: Yup.string().required("Full Name is required"),
    username: Yup.string().min(4, "Username must be at least 4 characters").required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    password_confirmation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Password confirmation is required"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    district: Yup.string().required("District is required"),
    location: Yup.string().required("Location is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  // 🌟 Initial values
  const initialValues = {
    customername: "",
    username: "",
    password: "",
    password_confirmation: "",
    phone: "", // ✅ Fixed field name
    district: "",
    location: "", // ✅ Ensured this field is present
    email: "",
    role: "customer",
  };

  // 🚀 Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Submitting values:", values); // Debug log to verify values
      
      const response = await mutateAsync({
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
        phone: values.phone, // ✅ Fixed phone field
        address: values.district, // Map district to address field in backend
        location: values.location, // ✅ Ensure location is passed correctly
      });

      if (response.success) {
        toast.success("🎉 Registration Successful!", { position: "top-right", autoClose: 3000 });
        resetForm();
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("❌ Registration failed. Please try again.", { position: "top-right", autoClose: 3000 });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('/images/4sign.webp')` }}>
      <ToastContainer />
      <div className="w-full max-w-2xl p-12 rounded-2xl shadow-xl border border-white/30 bg-white/60 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Create an Account</h1>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Name & Username */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: "customername", label: "Full Name", placeholder: "👤 Enter your full name" },
                  { name: "username", label: "Username", placeholder: "📛 Choose a username" },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-md font-medium text-black">{label}</label>
                    <Field type="text" name={name} className="w-full p-3 border border-gray-500 rounded-lg text-black bg-white" placeholder={placeholder} />
                    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                ))}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: "password", label: "Password", placeholder: "🔒 Enter a strong password" },
                  { name: "password_confirmation", label: "Confirm Password", placeholder: "🔑 Re-enter your password" },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-md font-medium text-black">{label}</label>
                    <Field type="password" name={name} className="w-full p-3 border border-gray-500 rounded-lg text-black bg-white" placeholder={placeholder} />
                    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                ))}
              </div>

              {/* Phone & District Fields */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: "phone", label: "Phone No.", placeholder: "📞 Enter number" }, // ✅ Fixed field name
                  { name: "district", label: "District", placeholder: "🌍 Enter your district" },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-md font-medium text-black">{label}</label>
                    <Field type="text" name={name} className="w-full p-3 border border-gray-500 rounded-lg text-black bg-white" placeholder={placeholder} />
                    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                ))}
              </div>

              {/* Location & Email Fields */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: "location", label: "Location", placeholder: "📍 Enter your location" }, // ✅ Fixed location field
                  { name: "email", label: "Email", placeholder: "✉️ Enter email" },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-md font-medium text-black">{label}</label>
                    <Field type="text" name={name} className="w-full p-3 border border-gray-500 rounded-lg text-black bg-white" placeholder={placeholder} />
                    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting} className={`w-full bg-gradient-to-r from-gray-800 to-black text-white p-3 rounded-lg mt-4 hover:shadow-lg hover:from-gray-900 hover:to-black transition-all duration-300 ${isSubmitting && "opacity-50 cursor-not-allowed"}`}>
                {isSubmitting ? "Registering..." : "Register"}
              </button>

              {/* Login Link */}
              <p className="text-center text-md mt-4 text-black">
                Already have an account? <a href="/login" className="text-black font-bold hover:underline">Login</a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
