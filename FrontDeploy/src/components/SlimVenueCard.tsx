import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface SlimVenueCardProps {
  name?: string;
  address?: string;
}

const SlimVenueCard: React.FC<SlimVenueCardProps> = ({ name, address }) => {
  return (
    <div className="w-full max-w-xs h-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="p-4">
        {/* Venue Name */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>
        
        {/* Address with Icon */}
        <div className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-lg text-gray-500" />
          <p className="text-sm">{address}</p>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-indigo-500 to-indigo-700 opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
    </div>
  );
};

export default SlimVenueCard;
