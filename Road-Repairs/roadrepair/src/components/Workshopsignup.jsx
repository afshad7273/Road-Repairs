import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wregisterAPI } from "../services/workshopService";
import { signup } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Workshopsignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutateAsync: registerWorkshop, isPending } = useMutation({
    mutationFn: wregisterAPI,
    mutationKey: ["workshop-signup"],
  });

  const validationSchema = Yup.object({
    workshopName: Yup.string().required("Workshop Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    district: Yup.string().required("District is required"),
    location: Yup.string().required("Location is required"),
    servicesOffered: Yup.array()
      .min(1, "Select at least one service offered")
      .of(Yup.string())
      .required("Services are required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const initialValues = {
    workshopName: "",
    username: "",
    email: "",
    phoneNumber: "",
    district: "",
    location: "",
    servicesOffered: [],
    password: "",
    password_confirmation: "",
    role: "workshop",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await registerWorkshop(values);
      dispatch(signup(response));
      sessionStorage.setItem("userData", response.token);
      sessionStorage.setItem("username", response.name);
      sessionStorage.setItem("useremail", response.email);
      navigate("/workhome");
    } catch (error) {
      console.error("SignUp failed:", error.message);
      toast.error("Registration failed. Please try again.");
    }
  };

  // Define service options for checkboxes
  const serviceOptions = [
    { value: "Wheel", label: "Wheel" },
    { value: "Tire Repair", label: "Tyre Repair" },
    { value: "Breakdown", label: "Breakdown" },
    { value: "Heat Issue", label: "Heat Issue" },
    { value: "AC Repair", label: "AC Repair" },
  ];

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-gray-900 bg-auto lg:bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/images/signup1.webp')" }}
    >
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <div className="w-full max-w-2xl p-12 rounded-2xl shadow-lg border border-white/30 bg-white/30 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Register Your Workshop</h1>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {["workshopName", "username"].map((name) => (
                  <div key={name}>
                    <label className="block text-md font-medium text-black">{name === "workshopName" ? "Workshop Name" : "Username"}</label>
                    <Field
                      type="text"
                      name={name}
                      className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white/50"
                      placeholder={name === "workshopName" ? "🏢 Enter workshop name" : "👤 Enter username"}
                    />
                    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                {["email", "phoneNumber"].map((name) => (
                  <div key={name}>
                    <label className="block text-md font-medium text-black">{name === "email" ? "Email" : "Phone No."}</label>
                    <Field
                      type="text"
                      name={name}
                      className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white/50"
                      placeholder={name === "email" ? "✉️ Enter email" : "📞 Enter number"}
                    />
                    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                {["district", "location"].map((name) => (
                  <div key={name}>
                    <label className="block text-md font-medium text-black">{name === "district" ? "District" : "Location"}</label>
                    <Field
                      type="text"
                      name={name}
                      className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white/50"
                      placeholder={name === "district" ? "🌍 Enter your district" : "📍 Enter your location"}
                    />
                    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-md font-medium text-black mb-1">Services Offered</label>
                <div className="w-full p-3 border border-gray-400 rounded-lg bg-white/50 h-32 overflow-y-auto">
                  {serviceOptions.map((option) => (
                    <div key={option.value} className="flex items-center mb-2">
                      <Field
                        type="checkbox"
                        name="servicesOffered"
                        value={option.value}
                        className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <span className="text-black">{option.label}</span>
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  name="servicesOffered"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                {["password", "password_confirmation"].map((name) => (
                  <div key={name}>
                    <label className="block text-md font-medium text-black">{name === "password" ? "Password" : "Confirm Password"}</label>
                    <Field
                      type="password"
                      name={name}
                      className="w-full p-3 border border-gray-400 rounded-lg text-black bg-white/50"
                      placeholder={name === "password" ? "🔒 Enter a strong password" : "🔑 Re-enter your password"}
                    />
                    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-900 to-black text-white p-3 rounded-lg mt-4 hover:shadow-lg hover:from-gray-800 hover:to-black transition-all duration-300"
              >
                {isPending || isSubmitting ? "Registering..." : "Register Workshop"}
              </button>

              <p className="text-center text-md mt-4 text-black">
                Already have an account? {" "}
                <Link to="/workshoplogin" className="text-black font-bold hover:underline">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Workshopsignup;