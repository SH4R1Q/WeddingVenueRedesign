import React, { useEffect, useState } from 'react';
import { FaHeart, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { Link, To } from 'react-router-dom';
import { useGetWishlistQuery } from '../redux/api/wishlist';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MdContacts, MdDinnerDining, MdLocationPin, MdPeople } from "react-icons/md";

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

const VenueCard: React.FC<VenueProps> = ({ venue }) => {
  const userId = useSelector((state: RootState) => state?.auth?.user?._id);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { data: wishlistData } = useGetWishlistQuery(userId ?? "");
  const [fade, setFade] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const itemId = venue.id;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [currentImageIndex]);


  useEffect(() => {
    if (wishlistData) {
      const isWishlisted = wishlistData?.wishlist?.items?.some(item => item.itemId === itemId) ?? false;
      setIsInWishlist(isWishlisted);
    }
  }, [wishlistData, itemId]);

  const toggleDescription = () => {
    setShowFullDescription(prevState => !prevState);
  };

  const truncatedDescription = venue.description ? `${venue.description.slice(0, 100)}...` : '';

  // const handlePrevImage = () => {
  //   setCurrentImageIndex(
  //     currentImageIndex === 0 ? (venue?.images?.length ?? 0) - 1 : currentImageIndex - 1
  //   );
  // };

  // const handleNextImage = () => {
  //   setCurrentImageIndex(
  //     currentImageIndex === (venue?.images?.length ?? 0) - 1 ? 0 : currentImageIndex + 1
  //   );
  // };

  //auto change crousal handler
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
    <div className="flex bg-gray-100 flex-col md:flex-row rounded-lg overflow-hidden mx-4 my-4
                    transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="relative md:w-1/2 h-full md:h-full">
        <div className={`w-full h-full transition-opacity duration-300 ease-in-out ${fade ? 'opacity-100' : 'opacity-80'}`}>
          <img
            src={venue?.images[currentImageIndex]}
            alt={`Venue ${currentImageIndex}`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Arrow Navigation
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button
          onClick={handlePrevImage}
          className="bg-white rounded-full p-1 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FaChevronLeft size={16} />
        </button>
        <button
          onClick={handleNextImage}
          className="bg-white rounded-full p-1 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FaChevronRight size={16} />
        </button>
      </div> */}
        {/* Dot Navigation */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-2">
          {venue?.images.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full bg-white ${index === currentImageIndex ? 'bg-gray-800' : 'opacity-50'
                }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
      {/* <div className="relative md:w-1/2 h-full md:h-full">
        <img
          src={venue?.images[currentImageIndex]}
          alt={`Venue ${currentImageIndex}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            onClick={handlePrevImage}
            className="bg-white rounded-full p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextImage}
            className="bg-white rounded-full p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div> */}

      <div className="md:w-1/2 p-4 text-left text-2xl">
        {/* <div className={`flex justify-center text-end items-end ${isInWishlist ? "text-red-500 transform scale-125" : "text-white transform scale-125 "}`}>
          <FaHeart size={25} />
        </div> */}
        <h2 className="text-xl md:text-3xl font-bold mb-2">{venue.name}</h2>
        <div className="flex items-center my-3">
          <MdLocationPin size={25} className="mr-2 text-gray-600" />
          <p className="text-lg md:text-xl text-gray-600">{venue.location?.substring(0,20)}...</p>
        </div>
        <div className="space-y-4 my-4">
          <div className="flex items-center">
            <MdPeople size={25} className="mr-2 text-gray-600" />
            <p className="text-sm md:text-lg text-gray-600 flex flex-col">
              <span className="font-bold">Max Guests</span>
              {venue.maxGuests}
            </p>
          </div>
          <div className="flex items-center">
            <MdContacts size={25} className="mr-2 text-gray-600" />
            <p className="text-sm md:text-lg text-gray-600 flex flex-col">
              <span className="font-bold">Contact</span>
              {venue.contact}
            </p>
          </div>
        </div>
        <div className="mb-4 text-sm md:text-lg text-gray-700">
          {venue.description && (
            <>
              {showFullDescription ? venue.description : truncatedDescription}
              {venue.description.length > 100 && (
                <button
                  onClick={toggleDescription}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none ml-2"
                >
                  {showFullDescription ? ' Read Less' : ' Read More'}
                  {showFullDescription ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
                </button>
              )}
            </>
          )}
        </div>
        {/* <div className="mb-4 flex justify-start">
          <div className=" text-sm md:text-lg text-gray-600 flex flex-col items-start justify-start">
            <MdDinnerDining size={40} className="mr-2" />
            <span className="font-bold">Price Per Plate</span> {venue.vegPrice}
          </div>
        </div> */}
        <div className="mb-4 flex items-center">
          <MdDinnerDining size={25} className="mr-2 text-gray-600" />
          <div className="text-sm md:text-lg text-gray-600 flex flex-col">
            <span className="font-bold">Price Per Plate</span>
            {venue.vegPrice?.substring(0,5)} Onwards
          </div>
        </div>

        <Link to={{ pathname: `/venuelist/${venue?.id}`, state: { venue } } as To}>
          <button className="bg-black hover:!bg-transparent border-2 border-solid border-black text-[#D6BF5E] font-bold py-2 px-4 rounded-full focus:outline-none text-sm md:text-lg">
            View Venue
          </button>
          {/* <button className="bg-[#D6BF5E] hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none text-sm md:text-lg">
            View Venue
          </button> */}
        </Link>
      </div>
    </div>
  );
};

export default VenueCard;
