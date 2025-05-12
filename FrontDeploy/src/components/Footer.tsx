// // import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
// import { useState } from 'react';
// import { Link } from "react-router-dom";
// import { FaCaretDown, FaCaretUp } from "react-icons/fa";
// function Footer() {
//   const [openSection, setOpenSection] = useState(null);

//   const toggleSection = (section: any) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   const sections = [
//     {
//       title: 'Start Planning',
//       links: [
//         'Search By Vendor',
//         'Search By City',
//         'Download Our App',
//         'Top Rated Vendors',
//         'Destination Wedding',
//       ],
//     },
//     {
//       title: 'Wedding Ideas',
//       links: [
//         'Wedding Blog',
//         'Wedding Inspiration Gallery',
//         'Real Wedding',
//         'Submit Wedding',
//       ],
//     },
//     {
//       title: 'Photo Gallery',
//       links: [
//         'Bridal Wear',
//         'Wedding Jewellery',
//         'Bridal Makeup & Hair',
//         'Wedding Decor',
//         'Wedding Photography',
//         'Groom Wear',
//         'Invitations & Favors',
//         'Wedding Accessories',
//         'Mehendi Designs',
//       ],
//     },
//     {
//       title: 'Home',
//       links: [
//         'About WeddingzVenue',
//         'Careers',
//         'Contact Us',
//         'Site Map',
//         'Terms & Conditions',
//         'Privacy Policy',
//         'Cancellation Policy',
//       ],
//     },
//     {
//       title: 'Wedding Invitation Maker',
//       links: [
//         'Wedding Card Designs',
//         'Save the Date Templates',
//         'Invitation Video Templates',
//       ],
//     },
//   ];

//   return (
//     <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-8">
//       {/* Mobile View (Dropdowns) */}
//       <div className="container mx-auto px-4 lg:px-20 lg:hidden space-y-4">
//         {sections.map((section, index) => (
//           <div key={index} className="border-b border-gray-700 pb-2">
//             <button
//               onClick={() => toggleSection(index)}
//               className="w-full flex justify-between items-center text-xl font-semibold text-white py-2 focus:outline-none"
//             >
//               {section.title}
              
//               <span>{openSection === index ? <FaCaretUp/> : <FaCaretDown/>}</span>
//             </button>
//             <div
//               className={`${
//                 openSection === index ? 'block' : 'hidden'
//               } transition-all duration-300`}
//             >
//               <ul className="mt-2 space-y-2">
//                 {section.links.map((link, idx) => (
//                   <li key={idx}>
//                     <Link to="#" className="text-base hover:text-white">
//                       {link}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Desktop View (Flex Layout) */}
//       <div className="container mx-auto px-4 lg:px-20 hidden lg:flex justify-evenly space-y-0">
//         {sections.map((section, index) => (
//           <div key={index} className="text-left">
//             <h2 className="text-xl font-semibold text-white mb-2">{section.title}</h2>
//             <ul className="footer-links flex flex-col">
//               {section.links.map((link, idx) => (
//                 <li key={idx} className="mb-2">
//                   <Link to="#" className="text-l hover:text-white">
//                     {link}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       {/* Divider Line */}
//       <div className="mt-8 border-t border-gray-700 pt-4 text-center">
//         <p className="text-xs">
//           &copy; {new Date().getFullYear()}{' '}
//           <span className="font-semibold text-white">Weddingz Venue</span>. All rights reserved.
//         </p>
//         <p className="mt-1 text-xs">
//           Designed by{' '}
//           <a
//             href="https://binarama.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-white hover:underline font-medium"
//           >
//             AMONG US COMMUNITY
//           </a>
//         </p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

// import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section: any) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      title: 'Start Planning',
      links: [
        { name: 'Search By Vendor', path: '/vendor/AllVendors' },
        // { name: 'Search By City', path: '/vendor/AllVendors' },
        // { name: 'Download Our App', path: '#' },
        { name: 'Top Rated Vendors', path: '/vendor/AllVendors' },
        // { name: 'Destination Wedding', path: '#' },
      ],
    },
    {
      title: 'Wedding Ideas',
      links: [
        { name: 'Wedding Blog', path: '/blogs' },
        { name: 'Wedding Inspiration Gallery', path: '/photos' },
        { name: 'Real Wedding', path: '/realWedding' },
        // { name: 'Submit Wedding', path: '#' },
      ],
    },
    // {
    //   title: 'Photo Gallery',
    //   links: [
    //     { name: 'Bridal Wear', path: '/realWedding' },
    //     { name: 'Wedding Jewellery', path: '/realWedding' },
    //     { name: 'Bridal Makeup & Hair', path: '/realWedding' },
    //     { name: 'Wedding Decor', path: '/realWedding' },
    //     { name: 'Wedding Photography', path: '/realWedding' },
    //     { name: 'Groom Wear', path: '/realWedding' },
    //     { name: 'Invitations & Favors', path: '/realWedding' },
    //     { name: 'Wedding Accessories', path: '/realWedding' },
    //     { name: 'Mehendi Designs', path: '/realWedding' },
    //   ],
    // },
    {
      title: 'Home',
      links: [
        { name: 'About WeddingzVenue', path: '/aboutus1' },
        // { name: 'Careers', path: '#' },
        { name: 'Contact Us', path: '/aboutus1' },
        // { name: 'Site Map', path: '#' },
        // { name: 'Terms & Conditions', path: '#' },
        // { name: 'Privacy Policy', path: '#' },
        // { name: 'Cancellation Policy', path: '#' },
      ],
    },
    // {
    //   title: 'Wedding Invitation Maker',
    //   links: [
    //     { name: 'Wedding Card Designs', path: '#' },
    //     { name: 'Save the Date Templates', path: '#' },
    //     { name: 'Invitation Video Templates', path: '#' },
    //   ],
    // },
  ];
  

  return (
    <footer className="bg-[#1b1b1b] text-gray-300 py-8">
      {/* Mobile View (Dropdowns) */}
      <div className="container mx-auto px-4 lg:px-20 lg:hidden space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="border-b border-gray-700 pb-2">
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex justify-between items-center text-xl font-semibold text-white py-2 focus:outline-none"
            >
              {section.title}
              
              <span>{openSection === index ? <FaCaretUp/> : <FaCaretDown/>}</span>
            </button>
            <div
              className={`${
                openSection === index ? 'block' : 'hidden'
              } transition-all duration-300`}
            >
              <ul className="mt-2 space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="text-base hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View (Flex Layout) */}
      <div className="container mx-auto px-4 lg:px-20 hidden lg:flex justify-evenly space-y-0">
        {sections.map((section, index) => (
          <div key={index} className="text-left">
            <h2 className="text-xl font-semibold text-white mb-2">{section.title}</h2>
            <ul className="footer-links flex flex-col">
              {section.links.map((link, idx) => (
                <li key={idx} className="mb-2">
                  <Link to={link.path} className="text-l hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="lg:text-left mt-8 border-t border-gray-700 pt-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-2">Shakti Khand 2, Indirapuram</p>
          <p className="mb-2">Ghaziabad, 201014</p>
          <p className="mb-2">Phone: <a href="tel:‪+918076207112‬" className="hover:underline text-white">‪+91 8076207112‬</a></p>
          <p>Email: <a href="mailto:Weddingzvenue.in@gmail.com" className="hover:underline text-white">Weddingzvenue.in@gmail.com</a></p>
        </div>

      {/* Divider Line
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-xs">
          &copy; {new Date().getFullYear()}{' '}
          <span className="font-semibold text-white">Weddingz Venue</span>. All rights reserved.
        </p>
        <p className="mt-1 text-xs">
          Designed by{' '}
          <a
            href="https://binarama.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline font-medium"
          >
            AMONG US COMMUNITY
          </a>
        </p>
      </div> */}
    </footer>
  );
}

export default Footer;