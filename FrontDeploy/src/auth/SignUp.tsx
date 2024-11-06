// "use client";
// import React, { FC, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { styles } from "../styles/style";
// import { Link, useNavigate } from "react-router-dom";
// import { useSignupMutation } from "../redux/api/user";

// const schema = Yup.object().shape({
//   name: Yup.string().required("Please enter your name!"),
//   email: Yup.string()
//     .email("Invalid email!")
//     .required("Please enter your email!"),
//   password: Yup.string().required("Please enter your password!").min(6),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
//     .required('Please confirm your password'),
// });

// const Signup: FC = () => {
//   const [show, setShow] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);
//   const [confirmPassword, setConfirmPassword] = useState("");
//   // const [phoneNumber, setPhoneNumber] = useState("");
//   const navigate = useNavigate()

//   const [register] = useSignupMutation();

//   const handleMobileNumberChange = (e: { target: { value: any } }) => {
//     const phoneNumber = e.target.value;
//     if (phoneNumber.length > 10) {
//       alert("Mobile number cannot be greater than 10 digits");
//     } else {
//       // setPhoneNumber(phoneNumber);
//     }
//   };

//   const checkPasswordStrength = (password: string | any[]) => {
//     let strength = 0;
//     if (password.length <= 6) {
//       strength = 1;
//     } else if (password.length <= 8) {
//       strength = 2;
//     } else {
//       strength = 3;
//     }
//     setPasswordStrength(strength);
//   };

//   const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     setConfirmPassword(value);
//     handleChange(e);
//   };

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       phoneNumber: "",
//       password: "",
//       confirmPassword: "",
//       role: "student",
//     },
//     validationSchema: schema,
//     onSubmit: async ({ name, email, phoneNumber, password }) => {
//       const data = { fullName: name, email: email, phone: phoneNumber, password: password };
//       console.log('User registration form submitted:', data);
//       const res = await register(data);
//       console.log(res);
//       if (res.data?.statusCode === 200) {
//         navigate('/login')
//         alert("User registered successfully");
//       }
//     },
//   });

//   const { errors, touched, values, handleChange, handleSubmit } = formik;

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold text-center mb-6">Join WeddingzVenue</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium" htmlFor="name">
//               Enter your Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={values.name}
//               onChange={handleChange}
//               id="name"
//               placeholder="John Doe"
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.name && touched.name ? 'border-red-500' : ''}`}
//             />
//             {errors.name && touched.name && (
//               <span className="text-red-500 pt-2 block">{errors.name}</span>
//             )}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium" htmlFor="email">
//               Enter your Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={values.email}
//               onChange={handleChange}
//               id="email"
//               placeholder="loginmail@gmail.com"
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.email && touched.email ? 'border-red-500' : ''}`}
//             />
//             {errors.email && touched.email && (
//               <span className="text-red-500 pt-2 block">{errors.email}</span>
//             )}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium" htmlFor="phoneNumber">
//               Enter your Mobile number
//             </label>
//             <input
//               type="number"
//               name="phoneNumber"
//               value={values.phoneNumber}
//               onChange={(e) => {
//                 handleChange(e);
//                 handleMobileNumberChange(e);
//               }}
//               id="phoneNumber"
//               placeholder="Enter your Number"
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : ''}`}
//             />
//             {errors.phoneNumber && touched.phoneNumber && (
//               <span className="text-red-500 pt-2 block">{errors.phoneNumber}</span>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block mb-1 font-medium" htmlFor="password">
//               Enter your password
//             </label>
//             <input
//               type={!show ? "password" : "text"}
//               name="password"
//               value={values.password}
//               onChange={(e) => {
//                 handleChange(e);
//                 checkPasswordStrength(e.target.value);
//               }}
//               id="password"
//               placeholder="password!@%"
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.password && touched.password ? 'border-red-500' : ''}`}
//             />
//             {!show ? (
//               <AiOutlineEyeInvisible
//                 className="absolute bottom-3 right-2 z-1 cursor-pointer"
//                 size={20}
//                 onClick={() => setShow(true)}
//               />
//             ) : (
//               <AiOutlineEye
//                 className="absolute bottom-3 right-2 z-1 cursor-pointer"
//                 size={20}
//                 onClick={() => setShow(false)}
//               />
//             )}
//           </div>
//           {errors.password && touched.password && (
//             <span className="text-red-500 pt-2 block">{errors.password}</span>
//           )}
//           <div>
//             <label className="block mb-1 font-medium" htmlFor="confirmPassword">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={confirmPassword}
//               onChange={handleChangeConfirmPassword}
//               id="confirmPassword"
//               placeholder="Confirm your password"
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}`}
//             />
//             {errors.confirmPassword && touched.confirmPassword && (
//               <span className="text-red-500 pt-2 block">{errors.confirmPassword}</span>
//             )}
//           </div>
//           {values.password && (
//             <div className="mt-2">
//               <div className="bg-gray-200 h-2 rounded">
//                 <div
//                   className={`${
//                     passwordStrength === 1
//                       ? "bg-red-500"
//                       : passwordStrength === 2
//                       ? "bg-orange-500"
//                       : "bg-green-500"
//                   } h-2 rounded`}
//                   style={{ width: `${(passwordStrength / 3) * 100}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs mt-1">
//                 Password Strength:{" "}
//                 {passwordStrength === 1
//                   ? "Weak"
//                   : passwordStrength === 2
//                   ? "Medium"
//                   : "Strong"}
//               </p>
//             </div>
//           )}
//           <div>
//             <input type="submit" value="Sign Up" className={`${styles.button} `} />
//           </div>
//         </form>
//         <div className="mt-4 flex flex-col items-center">
//           <h5 className="text-center text-[14px]">
//             Already have an account?{" "}
//             <span className="text-[#2190ff] pl-1 cursor-pointer">
//               <Link to="/login">Sign in</Link>
//             </span>
//           </h5>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


"use client";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/api/user";

// Password requirements message
const passwordRequirements = [
  "Minimum 8 characters",
  "At least 1 digit",
  "At least 1 special character",
];

// Validation schema with improved password checks
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  phoneNumber: Yup.string()
    .required("Please enter your mobile number!")
    .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
  password: Yup.string()
    .required("Please enter your password!")
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain at least 1 digit")
    .matches(/[!@#$%^&*]/, "Password must contain at least 1 special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Please confirm your password'),
});

// Modal component for success notification
const Modal: FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
        &times;
      </button>
      <p className="text-center font-semibold text-green-600">{message}</p>
    </div>
  </div>
);

const Signup: FC = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [register] = useSignupMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, phoneNumber, password }) => {
      setIsLoading(true);
      const data = { fullName: name, email, phone: phoneNumber, password };
      try {
        const res = await register(data);
        if (res.data?.statusCode === 200) {
          setIsModalOpen(true);
          setTimeout(() => {
            setIsModalOpen(false);
            navigate("/login");
          }, 3000); // Close modal and navigate to login after 3 seconds
        }
      } catch (error) {
        console.error("Registration error:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      {isModalOpen && <Modal message="Registration Successful!!" onClose={() => setIsModalOpen(false)} />}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-blue-700 text-center mb-6">Join Weddingz-Venue</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.name && touched.name ? 'border-red-500' : ''}`}
            />
            {errors.name && touched.name && <span className="text-red-500">{errors.name}</span>}
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="example@mail.com"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.email && touched.email ? 'border-red-500' : ''}`}
            />
            {errors.email && touched.email && <span className="text-red-500">{errors.email}</span>}
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium" htmlFor="phoneNumber">
              Mobile Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              id="phoneNumber"
              placeholder="1234567890"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : ''}`}
            />
            {errors.phoneNumber && touched.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
          </div>
          <div className="relative">
            <label className="block mb-1 text-gray-700 font-medium" htmlFor="password">
              Password
            </label>
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="Enter password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.password && touched.password ? 'border-red-500' : ''}`}
            />
            <AiOutlineEyeInvisible
              className={`absolute bottom-3 right-2 z-1 cursor-pointer ${show ? "hidden" : ""}`}
              size={20}
              onClick={() => setShow(!show)}
            />
            <AiOutlineEye
              className={`absolute bottom-3 right-2 z-1 cursor-pointer ${show ? "" : "hidden"}`}
              size={20}
              onClick={() => setShow(!show)}
            />
            {errors.password && touched.password && <span className="text-red-500">{errors.password}</span>}
            <ul className="mt-2 text-xs text-gray-500">
              {passwordRequirements.map((req, i) => (
                <li key={i} className={values.password.match(new RegExp(req)) ? "text-green-500" : ""}>
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              id="confirmPassword"
              placeholder="Re-enter password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && touched.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 mr-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-full py-2 text-white rounded-md ${
                isLoading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="mt-4 flex flex-col items-center">
          <h5 className="text-center text-[14px]">
            Already have an account?{" "}
            <span className="text-[#2190ff] pl-1 cursor-pointer hover:underline">
              <Link to="/login">Sign in</Link>
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Signup;

