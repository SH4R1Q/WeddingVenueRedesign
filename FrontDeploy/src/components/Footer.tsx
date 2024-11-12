// import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-black text-white py-10">
//       <div className="container mx-auto px-8 lg:px-20 flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
//         <div className="text-center lg:text-left">
//           <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
//           <div className="flex justify-center lg:justify-start items-center space-x-6">
//             <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
//               <FaFacebook className="text-3xl hover:text-red-500 transition duration-300 ease-in-out" />
//             </a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//               <FaTwitter className="text-3xl hover:text-red-500 transition duration-300 ease-in-out" />
//             </a>
//             <a href="https://www.instagram.com/weddingzvenue.in_?igsh=cG90dXR2Nml2NHMy&utm_source=qr" target="_blank" rel="noopener noreferrer">
//               <FaInstagram className="text-3xl hover:text-red-500 transition duration-300 ease-in-out" />
//             </a>
//           </div>
//         </div>
//         <div className="text-center lg:text-left">
//           <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
//           <p className="mb-2">Shakti Khand 2, Indirapuram</p>
//           <p className="mb-2">Ghaziabad, 201014</p>
//           <p className="mb-2">Phone: <a href="tel:+918076207112" className="hover:underline text-[#D6BF5E]">+91 8076207112</a></p>
//           <p>Email: <a href="mailto:Weddingzvenue.in@gmail.com" className="hover:underline text-[#D6BF5E]">Weddingzvenue.in@gmail.com</a></p>
//         </div>
//       </div>
//       <div className="mt-8 border-t border-gray-700 pt-6 text-center">
//         <p>&copy; {new Date().getFullYear()} Weddingz Venue. All rights reserved.</p>
//         <p className="mt-2">
//           Designed by{' '}
//           <a 
//             href="https://binarama.com/" 
//             target="_blank" 
//             rel="noopener noreferrer" 
//             className="text-[#D6BF5E] hover:underline"
//           >
//             BINARAMA
//           </a>
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-8 lg:px-20 flex justify-evenly space-y-8 lg:space-y-0">
        {/* Social Section */}
        <div className="text-left">
          <h2 className="text-xl font-semibold text-[#D6BF5E] mb-2 items-start">Start Planning</h2>
          <div className="footer-links flex flex-col justify-left">
            <h3 className="text-l mb-2">Search By Vendor</h3>
            <h3 className="text-l mb-2">Search By City</h3>
            <h3 className="text-l mb-2">Download Our App</h3>
            <h3 className="text-l mb-2">Top Rated Vendors</h3>
            <h3 className="text-l mb-2">Destination Wedding</h3>
          </div>

          </div>
          <div className="text-left">
            <h2 className="text-xl font-semibold text-[#D6BF5E] mb-2 items-start">Wedding Ideas</h2>
            <div className="footer-links flex flex-col justify-left">
              <h3 className="text-l mb-2">Wedding Blog</h3>
              <h3 className="text-l mb-2">Wedding Inspiration Gallery</h3>
              <h3 className="text-l mb-2">Real Wedding</h3>
              <h3 className="text-l mb-2">Submit Wedding</h3>
            </div>
        </div>

        <div className="text-left">
          <h2 className="text-xl font-semibold text-[#D6BF5E] mb-2 items-start">Photo Gallery</h2>
          <div className="footer-links flex flex-col justify-left">
            <h3 className="text-l mb-2">Bridal Wear</h3>
            <h3 className="text-l mb-2">Wedding Jewellery</h3>
            <h3 className="text-l mb-2">Bridal Makeup & Hair</h3>
            <h3 className="text-l mb-2">Wedding Decor</h3>
            <h3 className="text-l mb-2">Wedding Photography</h3>
            <h3 className="text-l mb-2">Groom Wear</h3>
            <h3 className="text-l mb-2">Invitations & Favors</h3>
            <h3 className="text-l mb-2">Wedding Accessories</h3>
            <h3 className="text-l mb-2">Mehendi Designs</h3>
          </div>

          </div>
          <div className="text-left">
            <h2 className="text-xl font-semibold text-[#D6BF5E] mb-2 items-start">Home</h2>
            <div className="footer-links flex flex-col justify-left">
              <h3 className="text-l mb-2">About WedMeGood</h3>
              <h3 className="text-l mb-2">Careers</h3>
              <h3 className="text-l mb-2">Contact Us</h3>
              <h3 className="text-l mb-2">Site Map</h3>
              <h3 className="text-l mb-2">Terms & Conditions</h3>
              <h3 className="text-l mb-2">Privacy Policy</h3>
              <h3 className="text-l mb-2">Cancellation Policy</h3>
            </div>
        </div>

        <div className="text-left">
            <h2 className="text-xl font-semibold text-[#D6BF5E] mb-2 items-start">Wedding Invitation Maker</h2>
            <div className="footer-links flex flex-col justify-left">
              <h3 className="text-l mb-2">Wedding Card Designs</h3>
              <h3 className="text-l mb-2">Save the Date Templates</h3>
              <h3 className="text-l mb-2">Invitation Video Templates</h3>
            </div>
        </div>









       
      </div>

      {/* Divider Line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-xs">&copy; {new Date().getFullYear()} <span className="font-semibold text-[#D6BF5E]">Weddingz Venue</span>. All rights reserved.</p>
        <p className="mt-1 text-xs">
          Designed by{' '}
          <a
            href="https://binarama.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D6BF5E] hover:underline font-medium"
          >
            BINARAMA
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

