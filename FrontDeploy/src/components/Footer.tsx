import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaCaretDown, FaCaretUp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section: any) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      title: 'Stay Connected',
      links: [
        {
          label: 'Facebook',
          href: 'https://www.facebook.com',
          icon: <FaFacebook />,
        },
        {
          label: 'Twitter',
          href: 'https://twitter.com',
          icon: <FaTwitter />,
        },
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/weddingzvenue.in_?igsh=cG90dXR2Nml2NHMy&utm_source=qr',
          icon: <FaInstagram />,
        },
      ],
    },
    {
      title: 'Contact Us',
      links: [
        'Shakti Khand 2, Indirapuram',
        'Ghaziabad, 201014',
        <span key="phone">
          Phone: <a href="tel:+918076207112" className="hover:underline text-[#D6BF5E]">+91 8076207112</a>
        </span>,
        <span key="email">
          Email: <a href="mailto:Weddingzvenue.in@gmail.com" className="hover:underline text-[#D6BF5E]">Weddingzvenue.in@gmail.com</a>
        </span>,
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-8">
      {/* Mobile View */}
      <div className="container mx-auto px-4 lg:px-20 lg:hidden space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="border-b border-gray-700 pb-2">
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex justify-between items-center text-xl font-semibold text-[#D6BF5E] py-2 focus:outline-none"
            >
              {section.title}
              <span>{openSection === index ? <FaCaretUp /> : <FaCaretDown />}</span>
            </button>
            <div className={${openSection === index ? 'block' : 'hidden'} transition-all duration-300}>
              <ul className="mt-2 space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    {typeof link === 'string' ? (
                      <p className="text-base">{link}</p>
                    ) : link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base flex items-center gap-2 hover:text-[#D6BF5E]"
                      >
                        {link.icon} {link.label}
                      </a>
                    ) : (
                      <p className="text-base">{link}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="container mx-auto px-4 lg:px-20 hidden lg:flex justify-evenly space-y-0">
        {/* Stay Connected */}
        <div className="text-left">
          <h2 className="text-xl font-semibold text-[#D6BF5E] mb-2">Stay Connected</h2>
          <div className="flex gap-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-3xl hover:text-red-500 transition duration-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-3xl hover:text-red-500 transition duration-300" />
            </a>
            <a href="https://www.instagram.com/weddingzvenue.in_?igsh=cG90dXR2Nml2NHMy&utm_source=qr" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-3xl hover:text-red-500 transition duration-300" />
            </a>
          </div>
        </div>

        {/* Contact Us */}
        <div className="text-left">
          <h2 className="text-xl font-semibold text-[#D6BF5E] mb-2">Contact Us</h2>
          <ul className="space-y-2 text-base">
            <li>Shakti Khand 2, Indirapuram</li>
            <li>Ghaziabad, 201014</li>
            <li>
              Phone:{' '}
              <a href="tel:+918076207112" className="hover:underline text-[#D6BF5E]">
                +91 8076207112
              </a>
            </li>
            <li>
              Email:{' '}
              <a href="mailto:Weddingzvenue.in@gmail.com" className="hover:underline text-[#D6BF5E]">
                Weddingzvenue.in@gmail.com
              </a>
            </li>
          </ul>
        </div>
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
            BINARAMA
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;