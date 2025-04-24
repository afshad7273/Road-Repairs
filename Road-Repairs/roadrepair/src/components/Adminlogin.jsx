import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../services/userServices";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { jwtDecode } from "jwt-decode";

export default function AdminLogin() {
  // 🎯 Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 State to track login errors
  const [loginError, setLoginError] = useState("");

  // 🚀 Mutation for login API
  const { mutateAsync, isError, isPending, error } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["admin-login"],
  });

  // ✅ Validation Schema
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // 🎯 Formik Setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const data = await mutateAsync(values);
        console.log(jwtDecode(data.token));

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
        // ❌ Handle incorrect login
        setLoginError(
          err?.response?.data?.message || "Incorrect email or password"
        );
      }
    },
  });

  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/vid1.mp4" type="video/mp4" />
      </video>

      {/* Login Form */}
      <div className="w-full max-w-lg shadow-2xl rounded-2xl p-12 bg-white/10 backdrop-blur-xl border border-gray-200 relative z-10">
        <h2 className="text-4xl font-bold text-center text-black drop-shadow-lg">
          Admin Login
        </h2>
        <p className="text-center text-black-300 mb-8">
          Enter your credentials to access the dashboard
        </p>

        {/* Error Message */}
        {loginError && (
          <p className="text-red-500 text-sm text-center mb-4">{loginError}</p>
        )}

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="text-black-300 font-medium block mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="admin@example.com"
              className={`w-full p-4 border rounded-lg bg-black-900/60 text-black backdrop-blur-md ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 bg-red-500/20"
                  : "border-gray-600 focus:ring-2 focus:ring-yellow-500"
              }`}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="text-black-300 font-medium block mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className={`w-full p-4 border rounded-lg bg-900/60 text-white backdrop-blur-md ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 bg-red-500/20"
                  : "border-gray-600 focus:ring-2 focus:ring-yellow-500"
              }`}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-black-300">
              <input
                type="checkbox"
                name="remember"
                className="mr-2 accent-yellow-500"
              />
              Remember me
            </label>
            <a href="#" className="text-yellow-400 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/50"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
