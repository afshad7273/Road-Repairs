import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { wloginAPI } from "../services/workshopService";
import { login } from "../redux/userSlice";

export default function Workshoplogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Initialize dispatch

  // 🎯 Validation Schema for login
  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // 🔥 UseMutation for login
  const { mutateAsync } = useMutation({
    mutationFn: wloginAPI,
    mutationKey: ["Workshop Login"],
  });

  // 📝 Formik Setup
  const { getFieldProps, errors, touched, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log(values);
      
      try {
        const response = await mutateAsync(values);
        console.log("Login successful:", response);
          dispatch(login(response))
          navigate("/workhome");
      } catch (error) {
        console.error("Login failed:", error.message);
        alert("Invalid email or password. Please try again.");
      }
    },
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{ backgroundImage: "url('images/w1.webp')" }}
    >
      <div className="w-full max-w-lg p-10 bg-transparent backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-20">
        <h2 className="text-4xl font-extrabold text-center text-black mb-8">Workshop Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label className="block text-lg font-semibold text-black mb-2">Email</label>
            <input
              type="email"
              placeholder="workshop@example.com"
              className="w-full px-5 py-4 bg-white bg-opacity-10 border border-black border-opacity-30 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition text-black placeholder-gray-600"
              {...getFieldProps("email")}
            />
            {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-lg font-semibold text-black mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-white bg-opacity-10 border border-black border-opacity-30 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition text-black placeholder-gray-600"
              {...getFieldProps("password")}
            />
            {touched.password && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-lg text-center text-black mt-6">
          Don't have an account?
          <Link to="/workshopsign" className="text-yellow-400 font-semibold hover:underline ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

