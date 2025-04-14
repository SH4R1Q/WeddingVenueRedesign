import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaCaretDown, FaCaretUp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

type SocialLink = {
  label: string;
  href: string;
  icon?: JSX.Element;
  isExternal?: boolean;
};

type Section = {
  title: string;
  links: SocialLink[];
};

function Footer() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (sectionIndex: number) => {
    setOpenSection(openSection === sectionIndex ? null : sectionIndex);
  };

  const sections: Section[] = [
    {
      title: 'Stay Connected',
      links: [
        {
          label: 'Facebook',
          href: 'https://www.facebook.com',
          icon: <FaFacebook />,
          isExternal: true,
        },
        {
          label: 'Twitter',
          href: 'https://twitter.com',
          icon: <FaTwitter />,
          isExternal: true,
        },
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/weddingzvenue.in_?igsh=cG90dXR2Nml2NHMy&utm_source=qr',
          icon: <FaInstagram />,
          isExternal: true,
        },
      ],
    },
    {
      title: 'Contact Us',
      links: [
        { label: 'Shakti Khand 2, Indirapuram', href: '#' },
        { label: 'Ghaziabad, 201014', href: '#' },
        {
          label: 'Phone: +91 8076207112',
          href: 'tel:+918076207112',
          isExternal: true,
        },
        {
          label: 'Email: Weddingzvenue.in@gmail.com',
          href: 'mailto:Weddingzvenue.in@gmail.com',
          isExternal: true,
        },
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
                    {link.href !== '#' ? (
                      <a
                        href={link.href}
                        target={link.isExternal ? "_blank" : "_self"}
                        rel={link.isExternal ? "noopener noreferrer" : ""}
                        className="text-base flex items-center gap-2 hover:text-[#D6BF5E]"
                      >
                        {link.icon && link.icon} {link.label}
                      </a>
                    ) : (
                      <p className="text-base">{link.label}</p>
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
            {sections[0].links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon && (
                  <span className="text-3xl hover:text-red-500 transition duration-300">
                    {link.icon}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Us */}
        <div className="text-left">
          <h2 className="text-xl font-semibold text-[#D6BF5E] mb-2">Contact Us</h2>
          <ul className="space-y-2 text-base">
            {sections[1].links.map((link, idx) => (
              <li key={idx}>
                {link.href !== '#' ? (
                  <a
                    href={link.href}
                    target={link.isExternal ? "_blank" : "_self"}
                    rel={link.isExternal ? "noopener noreferrer" : ""}
                    className="hover:underline text-[#D6BF5E]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <span>{link.label}</span>
                )}
              </li>
            ))}
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