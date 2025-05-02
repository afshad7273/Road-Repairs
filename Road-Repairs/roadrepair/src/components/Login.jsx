import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../services/userServices";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

const Login = () => {
  const [loginError, setLoginError] = useState(null)
  // 🎯 Mutation for login API
  const { mutateAsync, error, isError } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["customer login"],
  });

  // ✅ Validation Schema
  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // 🎯 Setup hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🎯 Formik setup
  const { getFieldProps, errors, touched, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const data = await mutateAsync(values);
        console.log(data);
        if(data.role === "customer"){
        dispatch(login(data));
        sessionStorage.setItem("token", data.token);
        navigate("/welcomesection"); // Redirect after login
        }else if(data.role === "workshop"){
          dispatch(login(data))
          sessionStorage.setItem("token", data.token);
          navigate("/workhome");
        }else if(data.role === "admin"){
          dispatch(login(data));
          sessionStorage.setItem("token", data.token);
          navigate("/admindashboard");
        }else{
          setLoginError("Invalid credentials")
        }
      } catch (err) {
        console.error("Login Error:", err);
      }
    },
  });

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="/cust speedo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Login Form Container */}
      <div className="relative bg-white/10 backdrop-blur-2xl p-10 md:p-16 rounded-2xl shadow-xl border border-white/40 w-full max-w-lg">
        <p className="text-4xl font-bold text-black text-center mb-6 drop-shadow-lg">Welcome Back</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mt-6">
            <label className="block text-black text-lg font-semibold mb-2">Email Address</label>
            <input
              className="w-full p-4 border-b border-white bg-white/10 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg backdrop-blur-md"
              type="email"
              placeholder="Enter your email"
              {...getFieldProps("email")}
            />
            {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mt-6">
            <label className="block text-black text-lg font-semibold mb-2">Password</label>
            <input
              className="w-full p-4 border-b border-white bg-white/10 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg backdrop-blur-md"
              type="password"
              placeholder="Enter your password"
              {...getFieldProps("password")}
            />
            {touched.password && errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            {/* <a href="#" className="text-sm text-black hover:text-teal-600 mt-2 block text-right">
              Forgot Password?
            </a> */}
          </div>

          {/* Submit Button */}
          <div className="mt-10">
            <button
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-300"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        {/* Sign Up & Error Handling */}
        <div className="mt-6 text-center">
          <Link to="/Signup" className="text-lg text-black">
            Don't have an account?{" "}
            <span className="text-teal-600 font-semibold hover:underline">Sign Up</span>
          </Link>
          {isError && (
            <div className="mt-4 text-red-500 text-sm bg-red-100 p-2 rounded-lg">
              {error?.response?.data?.message || "Login failed. Please try again."}
            </div>
            )}
          {loginError && <div className="mt-4 text-red-500 text-sm bg-red-100 p-2 rounded-lg">
            {"Login failed. Please try again."}
          </div>}
          
        </div>
      </div>
    </div>
  );
};

export default Login;
