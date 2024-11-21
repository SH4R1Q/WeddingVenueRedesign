import React, { useEffect, useState } from "react";
import { Link, To } from "react-router-dom";
import { MdLocationPin, MdPeople } from "react-icons/md";
import { useGetVenueByIdQuery } from "../redux/api/venue";

interface VenueProps {
  venue: {
    name: string | undefined;
    location: string | undefined;
    maxGuests: string | undefined;
    images: string[] | undefined;
    id: string;
  };
}

const VenueCard: React.FC<VenueProps> = ({ venue }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const {
    data: venueData,
  } = useGetVenueByIdQuery(venue.id);

  if(venue.name==="" && venue.location === "" && venue.maxGuests === ""){
    venue.name = venueData?.data.venue.businessName
    venue.location = venueData?.data.venue.city
    venue.maxGuests = venueData?.data.venue.guestCapacity
    venue.images = venueData?.data.venue.images
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const handleNextImage = () => {
        setFade(false);
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === (venue?.images?.length ?? 0) - 1 ? 0 : prevIndex + 1
          );
          setFade(true);
        }, 200); // Fade duration is 200ms
      };
    
      if (!venue?.images || venue.images.length === 0) {
        return <div></div>;
      }

  return (
    <div className="bg-white rounded-sm shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative h-48">
      <div className={`w-full h-full transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-80"}`}>
        <img
          src={venue.images[currentImageIndex]}
          alt={`Venue ${currentImageIndex}`}
          className="w-full h-full object-cover"
        />
        </div>
        {/* Image Navigation */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-2">
           {venue?.images.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full bg-white ${
                index === currentImageIndex ? "bg-gray-800" : "opacity-50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
        <div className="flex items-center text-gray-600 mb-2">
          <MdLocationPin size={20} className="mr-2" />
          <span>{venue.location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <MdPeople size={20} className="mr-2" />
          <span>Max Guests: {venue.maxGuests}</span>
        </div>
        <Link
          to={{ pathname: `/venuelist/${venue.id}`,state: { venue } } as To}
        >
          <button className="w-full border border-2 border-black bg-black text-white py-2 rounded-lg font-semibold hover:!bg-transparent hover:!text-black">
            View Venue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VenueCard;
