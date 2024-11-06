// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaUser, FaBell, FaBars, FaTimes } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';

// // Import your logo image
// import Logo from '/weddingz_venue_logo.png'; // Adjust the path as per your project structure

// const NavBar: React.FC = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
//   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
//   const role = useSelector((state: RootState) => state?.auth?.user?.role);
//   let url = "/";

//   if (role === "vendor") url = '/vendorProfilePage';
//   if (role === "venue") url = '/venueProfilePage';
//   if (role === "user") url = '/userProfilePage';
//   if (role === "admin") url = '/adminDashboard';
//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   return (
//     <nav className="bg-majenta bg-opacity-90 py-2 pl-2 pr-4 font-roboto relative z-10 m-0 sticky top-0">
//       <div className="container mx-0 flex md:justify-between justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="flex items-center ">
//           <img src={Logo} alt="Logo" className="w-32 h-12 items-stretch my-0 " />
//           {/* Adjust the class above (w-10 h-10 rounded-full) according to your logo size and shape */}

//         </Link>

//         {/* Navigation Links */}
//         <div className="options">
//           <ul className="hidden md:flex justify-center items-center space-x-8 flex-grow static top-0">
//             <li className="relative">
//             {/* #D6BF5E  */}
//               <Link to="/" className="text-light-blue hover:text-gray-200">Home</Link>
//             </li>
//             <li className="relative">
//               <Link to="/venuelist" className="text-light-blue hover:text-gray-200">Venues</Link>
//             </li>
//             <li className="relative">
//               <Link to="/vendor/AllVendors" className="text-light-blue hover:text-gray-200">Vendors</Link>
//             </li>
//             <li>
//               <Link to="/blogs" className="text-light-blue hover:text-gray-200">Blogs</Link>
//             </li>

//             <li>
//               <Link to="/realWedding" className="text-light-blue hover:text-gray-200">Real Weddings</Link>
//             </li>

//             <li>
//               <Link to="/aboutus1" className="text-light-blue hover:text-gray-200">Why Us</Link>
//             </li>
//           </ul>
//         </div>

//         {/* Right-side Icons */}
//         <div className="icons flex space-x-4">
//           <ul className="space-x-4 hidden md:block">
//             {isLoggedIn && (
//               <li className="relative">
//                  <Link to="/notification" className="text-light-blue hover:text-gray-200">
//                   <FaBell />
//                 </Link>
//               </li>
//             )}
//           </ul>

//           <ul className="flex items-center space-x-4">
//             {!isLoggedIn && (
//               <li className="bg-pink-600 relative hidden md:block rounded-full py-1 px-4">
//                 <Link to="/login" className="text-light-blue hover:text-gray-200">Login</Link>
//               </li>
//             )}
//             {isLoggedIn && (
//               <li className="relative hidden md:block">
//                 <Link to={url} className="text-light-blue hover:text-gray-200">
//                   <FaUser />
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           <button onClick={toggleMobileMenu} className="text-light-blue">
//             {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 bg-majenta  text-light-blue flex flex-col items-center justify-center space-y-4 z-10 transition-transform duration-300">

//           <div className='absolute top-8 '>
//            <img src={Logo} alt="Logo" className="w-32  h-12 items-stretch " />
//           </div>

//           <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-light-blue">
//             <FaTimes size={24} />
//           </button>
//           <ul className="flex flex-col items-center space-y-4">
//             <li>
//               <Link to="/" className=" text-2xl text-light-blue hover:text-gray-200" onClick={toggleMobileMenu}>Home</Link>
//             </li>
//             <li>
//               <Link to="/venuelist" className=" text-2xl text-light-blue hover:text-gray-200" onClick={toggleMobileMenu}>Venues</Link>
//             </li>
//             <li>
//               <Link to="/vendor/AllVendors" className=" text-2xl text-light-blue hover:text-gray-200" onClick={toggleMobileMenu}>Vendors</Link>
//             </li>
//             <li>
//               <Link to="/blogs" className="text-2xl text-light-blue hover:text-gray-200">Blogs</Link>
//             </li>

//             <li>
//               <Link to="/realWedding" className= " text-2xl text-light-blue hover:text-gray-200">Real Weddings</Link>
//             </li>

//             <li>
//               <Link to="/aboutus1" className=" text-2xl text-light-blue hover:text-gray-200">Why Us</Link>
//             </li>
//             {!isLoggedIn && (
//               <li>
//                 <Link to="/login" className=" text-2xl text-light-blue hover:text-gray-200" onClick={toggleMobileMenu}>Login</Link>
//               </li>
//             )}
//             {isLoggedIn && (
//               <li>
//                 <Link to="/vendorProfilePage" className="text-2xl" onClick={toggleMobileMenu}><FaUser /></Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NavBar;

// Import necessary modules and define the component
// Import necessary modules and define the component
import "./navbar.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaEnvelope, FaPhone } from "react-icons/fa";

import Logo from "/weddingz_venue_logo.png";

const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const role = useSelector((state: RootState) => state?.auth?.user?.role);
  const location = useLocation();
  const currentPath = location.pathname;
  const [opacity, setOpacity] = useState(1);

  let url = "/";
  if (role === "vendor") url = "/vendorProfilePage";
  if (role === "venue") url = "/venueProfilePage";
  if (role === "user") url = "/userProfilePage";
  if (role === "admin") url = "/adminDashboard";

  useEffect(() => {
    const handleScroll = () => {
      if (currentPath === "/") {
        if (window.scrollY > 50 && window.scrollY < 750) {
          // desired scroll threshold
          setOpacity(0.9); // Set to full opacity after scrolling
        } else {
          setOpacity(1); // Default opacity
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPath]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getActiveClass = (path: string) =>
    currentPath === path ? "active-link" : "";

  return (
    <nav
      className="bg-[#c9217e] py-2 pl-2 pr-4 font-roboto relative z-10 m-0 sticky top-0 "
      style={{ opacity }}
    >
      <div className="bg-gradient-to-r from-[#e363aa] via-[#d15b99] to-[#c04a87] text-white pl-2 pr-4 flex justify-between items-center border border-black rounded-md shadow-lg">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 text-center">
          <a
            href="mailto:Weddingzvenue.in@gmail.com"
            className="flex items-center space-x-2 hover:text-gray-100 transition-colors duration-200"
          >
            <FaEnvelope className="text-white text-lg" />
            <span className="text-sm font-medium sm:text-base">
              Weddingzvenue.in@gmail.com
            </span>
          </a>
          <a
            href="tel:+918076207112"
            className="flex items-center space-x-2 hover:text-gray-100 transition-colors duration-200"
          >
            <FaPhone className="text-white text-lg" />
            <span className="text-sm font-medium sm:text-base">
              +91 8076207112
            </span>
          </a>
        </div>
      </div>

      <div className="container mx-0 flex md:justify-between justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="w-32 h-12 items-stretch my-0" />
        </Link>

        <div className="options">
          <ul className="hidden md:flex justify-center items-center space-x-8 flex-grow static top-0">
            <li className="relative">
              <Link to="/" className={`${getActiveClass("/")} link-effect`}>
                Home
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/venuelist"
                className={`${getActiveClass("/venuelist")} link-effect`}
              >
                Venues
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/vendor/AllVendors"
                className={`${getActiveClass(
                  "/vendor/AllVendors"
                )} link-effect`}
              >
                Vendors
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className={`${getActiveClass("/blogs")} link-effect`}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/realWedding"
                className={`${getActiveClass("/realWedding")} link-effect`}
              >
                Real Weddings
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus1"
                className={`${getActiveClass("/aboutus1")} link-effect`}
              >
                Why Us
              </Link>
            </li>

            <li>
              <Link
                to="/newhome"
                className={`${getActiveClass("/newhome")} link-effect`}
              >
                New Home
              </Link>
            </li>
          </ul>
        </div>
        <div className="icons flex space-x-4">
          <ul className="space-x-4 hidden md:block">
            {isLoggedIn && (
              <li className="relative">
                <Link
                  to="/notification"
                  className="text-light-blue hover:text-gray-200"
                >
                  <FaBell />
                </Link>
              </li>
            )}
          </ul>

          <ul className="flex items-center space-x-4">
            {!isLoggedIn && (
              <li className="bg-pink-600 relative hidden md:block rounded-full py-1 px-4">
                <Link
                  to="/login"
                  className="text-light-blue hover:text-gray-200"
                >
                  Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="relative hidden md:block">
                <Link to={url} className="text-light-blue hover:text-gray-200">
                  <FaUser />
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-light-blue">
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-majenta text-light-blue flex flex-col items-center justify-center space-y-4 z-10 transition-transform duration-300">
          <div className="absolute top-8">
            <img src={Logo} alt="Logo" className="w-32 h-12 items-stretch" />
          </div>
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 text-light-blue"
          >
            <FaTimes size={24} />
          </button>
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link
                to="/"
                className={`${getActiveClass(
                  "/"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/venuelist"
                className={`${getActiveClass(
                  "/venuelist"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Venues
              </Link>
            </li>
            <li>
              <Link
                to="/newhome"
                className={`${getActiveClass(
                  "/NewHome"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Venues
              </Link>
            </li>
            <li>
              <Link
                to="/vendor/AllVendors"
                className={`${getActiveClass(
                  "/vendor/AllVendors"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Vendors
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className={`${getActiveClass(
                  "/blogs"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/realWedding"
                className={`${getActiveClass(
                  "/realWedding"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Real Weddings
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus1"
                className={`${getActiveClass(
                  "/aboutus1"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Why Us
              </Link>
            </li>

            {!isLoggedIn && (
              <li>
                <Link
                  to="/login"
                  className="text-2xl text-light-blue hover:text-gray-200"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link
                  to={url}
                  className="text-2xl text-light-blue hover:text-gray-200"
                  onClick={toggleMobileMenu}
                >
                  <FaUser />
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
