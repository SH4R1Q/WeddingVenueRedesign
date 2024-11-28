import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import RatingStars from "./RatingStars";
import { useGetWishlistQuery } from "../../redux/api/wishlist";
import { useAddBookingEnquiryMutation, useGetBookingByUserAndVenueQuery } from "../../redux/api/booking";
import EnquiryFormModal from "../EnquiryFormModal";

const userId = "665d6d766063ea750000e096";

type VendorCardProps = {
  _id: string | undefined;
  image?: string | undefined;
  businessName?: string;
  rating?: number;
  type_of_business?: string;
  packagePrice?: string;
  summary?: string;
  city?: string;
  state?: string;
  experience?: string;
  event_completed?: number;

};

const VendorCard: React.FC<VendorCardProps> = ({
  _id,
  image,
  city,
  state,
  businessName,
  rating,
  type_of_business,
  experience,
  event_completed,
  packagePrice,
}) => {
  const { data: wishlistData } = useGetWishlistQuery(userId);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemId = _id;

  const [sendEnquiry] = useAddBookingEnquiryMutation();
  const { data: bookingData } = useGetBookingByUserAndVenueQuery({ uId: userId, vId: itemId as string });
  const [hasSentEnquiry, setHasSentEnquiry] = useState(false);

  useEffect(() => {
    if (bookingData && bookingData.message === "True") {
      setHasSentEnquiry(true);
    }
  }, [bookingData]);

  useEffect(() => {
    if (wishlistData) {
      const isWishlisted = wishlistData?.wishlist?.items?.some((item: any) => item.itemId === itemId) ?? false;
      setIsInWishlist(isWishlisted);
    }
  }, [wishlistData, itemId]);

  const handleEnquirySubmit = async (formData: any) => {
    try {
      const res = await sendEnquiry({ ...formData, vId: itemId, uId: userId }).unwrap();
      if (res.message === "True") {
        setHasSentEnquiry(true);
      }
    } catch (error) {
      console.error("Failed to send enquiry:", error);
    }
  };

  const type = useParams();

  return (
    <>
    <Link to={`/vendor/${type.type}/${_id}`} target="_blank" className="block">
      <div className="relative bg-white rounded-lg overflow-hidden hover:shadow-md transition-transform transform mx-2 my-2 cursor-pointer">
        {/* Image Section */}
        <div className="h-48 p-2">
          <img
            src={image}
            alt={businessName}
            className="w-full h-full object-cover rounded-lg"
          />
          <div
            className={`absolute top-2 right-2 ${isInWishlist ? "text-pink-500" : "text-gray-300"}`}
          >
            <FaHeart size={22} />
          </div>
        </div>

        {/* Vendor Details */}
        <div className="p-3">
          <h3 className="text-lg font-semibold mb-2 truncate">{businessName}</h3>

          <div className="flex items-center text-md text-gray-500 mb-2">
            <MdLocationPin className="mr-0" />
            <span className="truncate">{state}, {city}</span>
          </div>

          <div className="flex items-left justify-between text-sm text-gray-500 mb-0">
            <span>{type_of_business} Price</span>
            <span>Rating</span>
          </div>
          <div className="flex items-left justify-between text-lg font-semibold text-base mb-2">
            <span>₹{packagePrice} <span className="text-sm text-gray-900 font-normal">per package</span></span>
            <RatingStars rating={rating || 3} />
          </div>

          <div className="flex items-center text-sm text-base font-semibold mb-2">
            <span className="bg-gray-200 px-1 py-0.5 rounded-sm border border-gray-300 mr-2">
              {experience} Experience
            </span>
            <span className="bg-gray-200 px-1 py-0.5 rounded-sm border border-gray-300">
              {event_completed} Events done
            </span>
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!hasSentEnquiry) setIsModalOpen(true);
            }}
            className={`text-sm transition-all duration-200 ease-in-out ${hasSentEnquiry
              ? "text-pink-400 cursor-not-allowed"
              : "text-pink-600 hover:underline"
              }`}
            aria-disabled={hasSentEnquiry}
          >
            {hasSentEnquiry ? "Enquiry Sent" : "Send Enquiry"}
          </a>
        </div>
      </div>
    </Link>
    

    {!hasSentEnquiry && (
      <EnquiryFormModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleEnquirySubmit}
        isLoggedIn={userId?true:false}
      />
    )}
    </>
  );
};

export default VendorCard;
