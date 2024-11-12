import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

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

const VenueCardNew: React.FC<VenueProps> = ({ venue }) => {
  const userId = useSelector((state: RootState) => state?.auth?.user?._id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (venue.images && venue.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === venue.images!.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [venue.images]);

  return (
    <div className="bg-white shadow-lg rounded-3xl overflow-hidden border-2 transition-transform transform hover:scale-105 duration-300 p-2 animate-fade-in w-[500px] animate-fade-in">
      {/* Image */}
      <div className="relative">
        <img
          src={venue?.images?.[currentImageIndex]}
          alt={venue.name}
          className="w-full h-96 object-cover transition-opacity duration-1000 ease-in-out p-3 rounded-3xl"
          style={{ transition: "opacity 1s ease-in-out" }}
        />
      </div>

      {/* Info container */}
      <div className="p-3">
        {/* Title */}
        <div id="title">
          <h2 className="text-3xl font-semibold font-inter text-black transition-colors duration-300 hover:text-pink-500">
            {venue.name}
          </h2>
        </div>

        {/* Location */}
        <div id="location" className="flex items-center mt-1">
          <MdLocationPin size={22} className="ml-[-5px] mr-1 text-pink-400" />
          <span className="text-gray-500 font-inter text-md uppercase">
            {venue.location}
          </span>
        </div>

        {/* Description */}
        <div className="mt-4 text-lg font-roboto font-light text-gray-500">
          {venue.name} <span className="">is a premium venue located at </span>
          {venue.location}. <span className="">It can easily accommodate</span>{" "}
          {venue.maxGuests}
          <span className=""> guests.</span>{" "}
          <span className="">You can contact them on</span> {venue.contact}.{" "}
        </div>

        {/* Other Info */}
        <div className="flex flex-row mt-4 justify-between">
          <span className="flex justify-center">
            <MdContacts size={22} className="ml-[-5px] mr-2 text-pink-400" />
            <span className="text-gray-500 font-inter text-md uppercase">
              {venue.contact}
            </span>
          </span>
          <span className="flex justify-center">
            <MdLocationPin size={22} className="ml-[-5px] mr-2 text-pink-400" />
            <span className="text-gray-500 font-inter text-md uppercase">
              {venue.location}
            </span>
          </span>
        </div>

        <Link to={{ pathname: `/venuelist/${venue?.id}` }}>
          <button className="bg-pink-400 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mt-4 w-full transition-transform transform hover:scale-105 duration-200">
            Know More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VenueCardNew;
