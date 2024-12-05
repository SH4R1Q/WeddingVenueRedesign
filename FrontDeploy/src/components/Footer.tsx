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
        'Search By Vendor',
        'Search By City',
        'Download Our App',
        'Top Rated Vendors',
        'Destination Wedding',
      ],
    },
    {
      title: 'Wedding Ideas',
      links: [
        'Wedding Blog',
        'Wedding Inspiration Gallery',
        'Real Wedding',
        'Submit Wedding',
      ],
    },
    {
      title: 'Photo Gallery',
      links: [
        'Bridal Wear',
        'Wedding Jewellery',
        'Bridal Makeup & Hair',
        'Wedding Decor',
        'Wedding Photography',
        'Groom Wear',
        'Invitations & Favors',
        'Wedding Accessories',
        'Mehendi Designs',
      ],
    },
    {
      title: 'Home',
      links: [
        'About WeddingzVenue',
        'Careers',
        'Contact Us',
        'Site Map',
        'Terms & Conditions',
        'Privacy Policy',
        'Cancellation Policy',
      ],
    },
    {
      title: 'Wedding Invitation Maker',
      links: [
        'Wedding Card Designs',
        'Save the Date Templates',
        'Invitation Video Templates',
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-8">
      {/* Mobile View (Dropdowns) */}
      <div className="container mx-auto px-4 lg:px-20 lg:hidden space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="border-b border-gray-700 pb-2">
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex justify-between items-center text-xl font-semibold text-[#D6BF5E] py-2 focus:outline-none"
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
                    <Link to="#" className="text-base hover:text-[#D6BF5E]">
                      {link}
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
            <h2 className="text-xl font-semibold text-[#D6BF5E] mb-2">{section.title}</h2>
            <ul className="footer-links flex flex-col">
              {section.links.map((link, idx) => (
                <li key={idx} className="mb-2">
                  <Link to="#" className="text-l hover:text-[#D6BF5E]">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider Line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-xs">
          &copy; {new Date().getFullYear()}{' '}
          <span className="font-semibold text-[#D6BF5E]">Weddingz Venue</span>. All rights reserved.
        </p>
        <p className="mt-1 text-xs">
          Designed by{' '}
          <a
            href="https://binarama.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D6BF5E] hover:underline font-medium"
          >
            AMONG US COMMUNITY
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;