import React from "react";
import { useNavigate } from "react-router-dom";

interface VenueContactCardProps {
  isLoggedIn: boolean; // Whether the user is logged in
  venueName: string | undefined;
  contactNumber: string | undefined;
  email: string | undefined;
}

const VenueContactCard: React.FC<VenueContactCardProps> = ({
  isLoggedIn,
  venueName,
  contactNumber,
  email,
}) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login')

  };

  return (
    <div className="bg-white border border-1 border-gray-500 shadow-md p-6 max-w-sm">
      <h2 className="text-lg font-semibold mb-4">{venueName} Contact Details</h2>
      {isLoggedIn ? (
        <div>
          <p className="text-gray-700">
            <strong>Phone:</strong> {contactNumber}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {email}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 mb-4">
            Please log in to view the contact details of this venue.
          </p>
          <button
            onClick={handleLoginClick}
            className="bg-pink-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-pink-700"
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default VenueContactCard;
