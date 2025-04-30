import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignupMutation } from "../redux/api/vendor";
import { toast } from "react-toastify";
import { useSignupVenueMutation } from "../redux/api/venue";
import { useSubmitAdminEnquiryMutation } from "../redux/api/enquiry";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/skeleton/Loader";

const businessCategories = [
  "Photographer",
  "MakeupArtist",
  "MehendiArtist",
  "Decorator",
  "Caterer",
  "BandBaja",
  "Dhol",
  "TattooArtist",
  "Messkot",
  "Magicians",
  "FogEvent",
  "GameCoordinator",
  "Anchor",
  "LiveSinger",
  "WelcomeGirls",
  "WaiterService",
  "ValetParking",
  "DJ",
  "BirthdayEntry",
  "JagranSetup",
  "MataChowkiSetup",
  "Bartender",
  "RoomsBooking",
];

const RegistrationPageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen rounded-lg flex items-center justify-center py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
    <div className="w-full max-w-3xl p-8 sm:p-10 bg-white rounded-lg shadow-lg relative z-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Register with Us
      </h1>
      {children}
    </div>
  </div>
);

const commonStyles = {
  input:
    "w-full px-4 py-2 mt-1 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500",
  label: "block mb-1 font-medium text-gray-700",
  error: "text-red-500 text-sm mt-1",
  button:
    "w-full mt-6 py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out",
};

export const VenueRegistrationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [register] = useSignupVenueMutation();
  const [submitAdminEnquiry] = useSubmitAdminEnquiryMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      businessName: "",
      city: "",
      yourName: "",
      phone: "",
      email: "",
      password: "",
      comments: "",
    },
    validationSchema: Yup.object({
      businessName: Yup.string().required("Business name is required"),
      city: Yup.string().required("City name is required"),
      yourName: Yup.string().required("Your name is required"),
      phone: Yup.string().required("Contact number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      comments: Yup.string(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      values.city = capitalizeFirstLetter(values.city);
      const res = await register(values);

      if (res?.data?.success === true) {
        await submitAdminEnquiry({
          name: values.yourName,
          contact: values.phone,
          location: values.city,
          typeOfEvent: "Venue Registration",
          message: `New venue registration: ${values.businessName}`,
        });
        toast.success("Successfully Registered");
        navigate("/login");
      } else {
        toast.error("Registration failed");
      }
      setIsLoading(false);
    },
  });

  function capitalizeFirstLetter(city: string) {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  }

  return (
    <RegistrationPageWrapper>
      {isLoading && <Loader />}
      <form onSubmit={formik.handleSubmit}>
        <label className={commonStyles.label} htmlFor="businessName">Business Name</label>
        <input id="businessName" name="businessName" type="text" className={commonStyles.input}
          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.businessName} />
        {formik.touched.businessName && formik.errors.businessName && (
          <div className={commonStyles.error}>{formik.errors.businessName}</div>
        )}
        
        <label className={commonStyles.label} htmlFor="city">City</label>
        <input id="city" name="city" type="text" className={commonStyles.input}
          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
        {formik.touched.city && formik.errors.city && (
          <div className={commonStyles.error}>{formik.errors.city}</div>
        )}

        <label className={commonStyles.label} htmlFor="yourName">Your Name</label>
        <input id="yourName" name="yourName" type="text" className={commonStyles.input}
          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.yourName} />
        {formik.touched.yourName && formik.errors.yourName && (
          <div className={commonStyles.error}>{formik.errors.yourName}</div>
        )}

        <label className={commonStyles.label} htmlFor="phone">Contact</label>
        <input id="phone" name="phone" type="text" className={commonStyles.input}
          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
        {formik.touched.phone && formik.errors.phone && (
          <div className={commonStyles.error}>{formik.errors.phone}</div>
        )}

        <label className={commonStyles.label} htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className={commonStyles.input}
          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
        {formik.touched.email && formik.errors.email && (
          <div className={commonStyles.error}>{formik.errors.email}</div>
        )}

        <label className={commonStyles.label} htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className={commonStyles.input}
          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
        {formik.touched.password && formik.errors.password && (
          <div className={commonStyles.error}>{formik.errors.password}</div>
        )}

        <label className={commonStyles.label} htmlFor="comments">Comments</label>
        <textarea id="comments" name="comments" className={commonStyles.input}
          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.comments} />

        <button type="submit" className={commonStyles.button} disabled={isLoading}>Register Venue</button>
      </form>
    </RegistrationPageWrapper>
  );
};

export const VendorRegistrationForm: React.FC = () => {
  const Vendor = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    email: Yup.string().email("Invalid email!").required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),
    phone: Yup.string().required("Please enter your phone number!"),
    city: Yup.string().required("Please enter your city!"),
    type_Of_Business: Yup.string().required("Please enter your business type!"),
    businessName: Yup.string().required("Please enter your business name!"),
  });
  const navigate = useNavigate();
  const [register, { data, error, isSuccess }] = useSignupMutation();
  const [submitAdminEnquiry] = useSubmitAdminEnquiryMutation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Registration successful");
    }
    if (error) {
      if ("data" in error) {
        toast.error((error as any).data.message);
      }
    }
  }, [isSuccess, error, data?.message]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      city: "",
      type_Of_Business: "",
      businessName: "",
    },
    validationSchema: Vendor,
    onSubmit: async (values) => {
      setIsLoading(true);
      values.city = capitalizeFirstLetter(values.city);
      try {
        const res = await register(values);
        if (res?.data?.success === true) {
          await submitAdminEnquiry({
            name: values.name,
            contact: values.phone,
            location: values.city,
            typeOfEvent: "Vendor Registration",
            message: `New vendor registration: ${values.businessName}`,
          });
          toast.success("You Have Successfully Registered");
          navigate("/login");
        }
      } catch (error) {
        toast.error("Registration failed");
      } finally {
        setIsLoading(false);
      }
    },
  });

  function capitalizeFirstLetter(city: string) {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  }

  return (
    <RegistrationPageWrapper>
      {isLoading && <Loader />}
      <form onSubmit={formik.handleSubmit}>
      <label className={commonStyles.label} htmlFor="name">Your Name</label>
          <input id="name" name="name" type="text" className={commonStyles.input}
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
          {formik.touched.name && formik.errors.name && (
            <div className={commonStyles.error}>{formik.errors.name}</div>
          )}

          <label className={commonStyles.label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={commonStyles.input}
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {formik.touched.email && formik.errors.email && (
            <div className={commonStyles.error}>{formik.errors.email}</div>
          )}

          <label className={commonStyles.label} htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className={commonStyles.input}
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
          {formik.touched.password && formik.errors.password && (
            <div className={commonStyles.error}>{formik.errors.password}</div>
          )}

          <label className={commonStyles.label} htmlFor="phone">Contact Number</label>
          <input id="phone" name="phone" type="text" className={commonStyles.input}
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
          {formik.touched.phone && formik.errors.phone && (
            <div className={commonStyles.error}>{formik.errors.phone}</div>
          )}

          <label className={commonStyles.label} htmlFor="city">City</label>
          <input id="city" name="city" type="text" className={commonStyles.input}
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
          {formik.touched.city && formik.errors.city && (
            <div className={commonStyles.error}>{formik.errors.city}</div>
          )}

          <label className={commonStyles.label} htmlFor="type_Of_Business">Type of Business</label>
          <select id="type_Of_Business" name="type_Of_Business" className={commonStyles.input}
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.type_Of_Business}>
            <option value="">Select Business Type</option>
            {businessCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          {formik.touched.type_Of_Business && formik.errors.type_Of_Business && (
            <div className={commonStyles.error}>{formik.errors.type_Of_Business}</div>
          )}

          <label className={commonStyles.label} htmlFor="businessName">Business Name</label>
          <input id="businessName" name="businessName" type="text" className={commonStyles.input}
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.businessName} />
          {formik.touched.businessName && formik.errors.businessName && (
            <div className={commonStyles.error}>{formik.errors.businessName}</div>
          )}

          <button type="submit" className={commonStyles.button} disabled={isLoading}>
            Register Vendor
          </button>
      </form>
    </RegistrationPageWrapper>
  );
};
