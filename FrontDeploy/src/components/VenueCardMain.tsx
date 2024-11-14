import React, { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Link, To } from "react-router-dom";
import {
  MdContacts,
  MdDinnerDining,
  MdLocationPin,
  MdPeople,
} from "react-icons/md";

interface VenueProps {
  venue: {
    name: string | undefined;
    location: string | undefined;
    maxGuests: string | undefined;
    contact: string | undefined;
    description: string | undefined;
    vegPrice?: string | undefined;
    nonVegPrice?: number | undefined;
    images: string[] | undefined;
    id: string | undefined;
  };
}

const VenueCardMain: React.FC<VenueProps> = ({ venue }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  const truncatedDescription = venue.description
    ? `${venue.description.slice(0, 80)}...`
    : "";

  const handleNextImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === (venue?.images?.length ?? 0) - 1 ? 0 : prevIndex + 1
      );
      setFade(true);
    }, 200);
  };

  if (!venue?.images || venue.images.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 mx-4 my-4">
      {/* Image Carousel */}
      <div className="relative h-48">
        <div
          className={`w-full h-full transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-80"}`}
        >
          <img
            src={venue?.images[currentImageIndex]}
            alt={`Venue ${currentImageIndex}`}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {venue?.images.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full bg-white ${index === currentImageIndex ? "bg-gray-800" : "opacity-50"}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Venue Details */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{venue.name}</h2>
        <div className="flex items-center text-semibold text-gray-600 mb-2">
          <MdLocationPin size={18} className="mr-4" />
          <span>{venue.location?.substring(0, 20)}</span>
        </div>

        <div className="flex items-center text-semibold text-gray-600 mb-2">
          <MdPeople size={18} className="mr-4" />
          <span>Max Guests: {venue.maxGuests}</span>
        </div>

        <div className="flex items-center text-semibold text-gray-600 mb-2">
          <MdContacts size={18} className="mr-4" />
          <span>Contact: {venue.contact}</span>
        </div>

        <div className="flex items-center text-semibold text-gray-600 mb-4">
          <MdDinnerDining size={18} className="mr-4" />
          <span>Price Per Plate: {venue.vegPrice?.substring(0, 5)} Onwards</span>
        </div>

        <div className="text-semibold text-gray-700 mb-2">
          {venue.description && (
            <>
              {showFullDescription ? venue.description : truncatedDescription}
              {venue.description.length > 80 && (
                <button
                  onClick={toggleDescription}
                  className="text-blue-500 hover:text-blue-700 ml-1"
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                  {showFullDescription ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                </button>
              )}
            </>
          )}
        </div>

        <Link to={{ pathname: `/venuelist/${venue?.id}`, state: { venue } } as To}>
          <button className="w-full bg-pink-600 text-white py-2 rounded-md 
          font-semibold hover:!bg-transparent hover:!text-black border border-black">
            View Venue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VenueCardMain;
