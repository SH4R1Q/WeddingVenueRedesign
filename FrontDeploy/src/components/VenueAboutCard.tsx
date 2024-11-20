import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

interface VenueAboutCardProps {
  about?: string;
  contactNumber?: string;
}

const VenueAboutCard: React.FC<VenueAboutCardProps> = ({ about, contactNumber }) => {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden p-6">
      {/* About Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">About This Venue</h2>
        <p className="text-gray-600 text-base">{about}</p>
      </div>

      {/* Contact Info Section */}
      <div className="flex items-center space-x-3">
        <FaPhoneAlt className="text-lg text-indigo-600" />
        <p className="text-lg font-semibold text-gray-700">{contactNumber}</p>
      </div>
    </div>
  );
};

export default VenueAboutCard;
