import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../services/userServices";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
// import { login } from "../redux/userSlice";



const Login = () => {
  const { mutateAsync } = useMutation({
    mutationFn:loginAPI,
    mutationKey: ["Adminlogin"],
  });

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { getFieldProps, errors, touched, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit:  (values) => {
      mutateAsync(values).then((data)=>{
        dispatch(login(data))
        localStorage.setItem("userData",data)
        navigate('/welcomesection')
        
      })
    },
  });

  return (
    <div
      className="flex items-center justify-center h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/images/login1.webp')` }}
    >
      <div className="bg-white/30 backdrop-blur-lg p-10 md:p-16 rounded-2xl shadow-xl border border-white/40 w-full max-w-lg">
        <p className="text-4xl font-bold text-black text-center mb-6">Welcome Back</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label className="block text-black text-lg font-semibold mb-2">Email Address</label>
            <input
              className="w-full p-4 border-b border-black bg-transparent text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="email"
              placeholder="Enter your email"
              {...getFieldProps("email")}
            />
            {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mt-6">
            <label className="block text-black text-lg font-semibold mb-2">Password</label>
            <input
              className="w-full p-4 border-b border-black bg-transparent text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="password"
              placeholder="Enter your password"
              {...getFieldProps("password")}
            />
            {touched.password && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            <a href="#" className="text-sm text-black hover:text-teal-600 mt-2 block text-right">Forgot Password?</a>
          </div>
          <div className="mt-10">
            <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-300" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link to="/Signup" className="text-lg text-black">
            Don't have an account? <span className="text-teal-600 font-semibold hover:underline">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;




// import React from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { data } from 'react-router-dom';
// import { log } from 'three/tsl';
// import { useMutation } from '@tanstack/react-query';




// const Loginpage = () => {
//   const loginSchema = yup.object().shape({
//     email: yup.string().email('Invalid email format').required('Email is required'),
//     password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   });
//   const {mutateAsync} =useMutation({
//     mutationFn:"",
//     mutationKey:["Adminlogin"],
//   })
//   const { getFieldProps, errors, touched, handleSubmit } = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: loginSchema,
//     onSubmit: async(values) => {
//       mutateAsync(values).then((data)=>{
//       console.log(data)
//       })
//       console.log('Logging in with:', values);
//     },
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border-t-4 border-blue-500">
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email Input */}
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
//               {...getFieldProps("email")}
//             />
//             {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//           </div>

//           {/* Password Input (Standard, No Toggle) */}
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
//               {...getFieldProps("password")}
//             />
//             {touched.password && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//           </div>

//           {/* Login Button */}
//           <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition" type="submit">
//             Login
//           </button>
//         </form>

//         <p className="text-center text-gray-600 mt-4">
//           Don't have an account?{' '}
//           <a href="/signup" className="text-blue-500 font-semibold hover:underline">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Loginpage;