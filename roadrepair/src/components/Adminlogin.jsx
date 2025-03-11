// import { useMutation } from "@tanstack/react-query";
// import { useState, useEffect, useRef } from "react";
// import * as THREE from "three";
// import HALO from "vanta/dist/vanta.halo.min";


// export default function AdminLogin() {
//   const [vantaEffect, setVantaEffect] = useState(null);
//   const backgroundRef = useRef(null);

//   useEffect(() => {
//     if (!vantaEffect) {
//       setVantaEffect(
//         HALO({
//           el: backgroundRef.current,
//           THREE: THREE,
//           backgroundColor: 0x0d0d0d,
//           amplitudeFactor: 3.0,
//           size: 1.5,
//           speed: 1.5,
//           baseColor: 0x4a90e2,
//           highlightColor: 0xffc107,
//         })
//       );
//     }
//     return () => vantaEffect && vantaEffect.destroy();
//   }, [vantaEffect]);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ email, password, remember });
//   };

//   return (
//     <div ref={backgroundRef} className="h-screen w-screen flex items-center justify-center relative">
//       <div className="w-full max-w-lg shadow-2xl rounded-2xl p-12 bg-transparent backdrop-blur-lg border border-gray-700 relative z-10">
//         <h2 className="text-4xl font-bold text-center text-white">Admin Login</h2>
//         <p className="text-center text-gray-400 mb-8">Enter your credentials to access the dashboard</p>
//         <div>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="text-gray-300 font-medium">Email Address</label>
//               <div className="relative mt-1">
//                 <input 
//                   type="email" 
//                   id="email" 
//                   value={email} 
//                   onChange={(e) => setEmail(e.target.value)} 
//                   placeholder="admin@example.com" 
//                   required 
//                   className="w-full p-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="password" className="text-gray-300 font-medium">Password</label>
//               <div className="relative mt-1">
//                 <input 
//                   type="password" 
//                   id="password" 
//                   value={password} 
//                   onChange={(e) => setPassword(e.target.value)} 
//                   placeholder="********" 
//                   required 
//                   className="w-full p-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <label className="flex items-center text-gray-300">
//                 <input 
//                   type="checkbox" 
//                   checked={remember} 
//                   onChange={() => setRemember(!remember)}
//                   className="mr-2 accent-blue-600"
//                 />
//                 Remember me
//               </label>
//               <a href="#" className="text-sm text-blue-400 hover:underline">Forgot password?</a>
//             </div>
//             <button 
//               type="submit" 
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg transition-all duration-300 text-lg"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min";

export default function AdminLogin() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        HALO({
          el: backgroundRef.current,
          THREE: THREE,
          backgroundColor: 0x0d0d0d,
          amplitudeFactor: 3.0,
          size: 1.5,
          speed: 1.5,
          baseColor: 0x4a90e2,
          highlightColor: 0xffc107,
        })
      );
    }
    return () => vantaEffect && vantaEffect.destroy();
  }, [vantaEffect]);

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (values) => {
      // Placeholder for API call
      return new Promise((resolve) => setTimeout(() => resolve({ success: true, data: values }), 1000));
    },
    mutationKey: ["Adminlogin"],
  });

  const { getFieldProps, errors, touched, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const data = await mutateAsync(values);
        console.log("Login successful:", data);
      } catch (error) {
        console.error("Login failed", error);
      }
    },
  });

  return (
    <div ref={backgroundRef} className="h-screen w-screen flex items-center justify-center relative">
      <div className="w-full max-w-lg shadow-2xl rounded-2xl p-12 bg-transparent backdrop-blur-lg border border-gray-700 relative z-10">
        <h2 className="text-4xl font-bold text-center text-white">Admin Login</h2>
        <p className="text-center text-gray-400 mb-8">Enter your credentials to access the dashboard</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-gray-300 font-medium">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="admin@example.com"
              required
              className="w-full p-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...getFieldProps("email")}
            />
            {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="text-gray-300 font-medium">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              required
              className="w-full p-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...getFieldProps("password")}
            />
            {touched.password && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-300">
              <input type="checkbox" className="mr-2 accent-blue-600" {...getFieldProps("remember")} />
              Remember me
            </label>
            <a href="#" className="text-sm text-blue-400 hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg transition-all duration-300 text-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
