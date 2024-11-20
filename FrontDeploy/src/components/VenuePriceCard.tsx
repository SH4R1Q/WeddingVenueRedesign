import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  useDeleteWishlistMutation,
  useGetWishlistQuery,
  useAddWishlistMutation,
} from "../redux/api/wishlist";
import EnquiryFormModal from "./EnquiryFormModal";
import { useAddBookingEnquiryMutation, useGetBookingByUserAndVenueQuery } from "../redux/api/booking";

interface VenuePriceCardProps {
  name?: string;
  vegPrice?: string | undefined;
  nonVegPrice?: string;
  contact?: string;
}

const OtpPopup: React.FC<{ otp: string | undefined }> = ({ otp }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg text-gray-800 font-semibold mb-2">Your OTP</h3>
      <p className="text-xl text-black font-bold">{otp || "N/A"}</p>
    </div>
  </div>
);

const VenuePriceCard: React.FC<VenuePriceCardProps> = ({ name, vegPrice, nonVegPrice }) => {
  const userId = useSelector((state: RootState) => state?.auth?.user?._id);
  const { id: venueId } = useParams<{ id: string }>();
  const [isWishlistSelected, setIsWishlistSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSentEnquiry, setHasSentEnquiry] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const [addWishlist] = useAddWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();
  const [sendEnquiry] = useAddBookingEnquiryMutation();

  const { data: wishlistData, refetch } = useGetWishlistQuery(userId ?? "");
  const { data: bookingData } = useGetBookingByUserAndVenueQuery({
    uId: userId ?? "",
    vId: venueId as string,
  });

  const otp = bookingData?.bookingId;

  const itemId = venueId;
  const itemType = "venue";

  useEffect(() => {
    if (wishlistData) {
      const isWishlisted =
        wishlistData?.wishlist?.items?.some((item) => item.itemId === itemId) ?? false;
      setIsWishlistSelected(isWishlisted);
    }
  }, [wishlistData, itemId]);

  useEffect(() => {
    if (bookingData?.message === "True") {
      setHasSentEnquiry(true);
    }
  }, [bookingData]);

  const handleWishlistClick = async () => {
    try {
      if (isWishlistSelected) {
        if (userId && itemId && itemType) {
          await deleteWishlist({ userId, itemId, itemType }).unwrap();
        } else {
          console.error("userId, itemId, or itemType is undefined!");
        }
        console.log("Item removed from wishlist");
      } else {
        if (userId && itemId && itemType) {
          await addWishlist({ userId, itemId, itemType }).unwrap();
        } else {
          console.error("userId, itemId, or itemType is undefined!");
        }
        console.log("Item added to wishlist");
      }
      refetch();
      setIsWishlistSelected(!isWishlistSelected);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  const handleEnquirySubmit = async (formData: any) => {
    try {
      const res = await sendEnquiry({ ...formData, vId: itemId, uId: userId }).unwrap();
      console.log("Enquiry submission response:", res);

      if (res.message === "True") {
        setHasSentEnquiry(true);
      }
    } catch (error) {
      console.error("Failed to send enquiry:", error);
    }
  };

  const handleEnquirySentClick = () => {
    if (hasSentEnquiry) {
      setShowOtpPopup(true);
      setTimeout(() => setShowOtpPopup(false), 5000);
    }
  };

  return (
    <div className="w-full max-w-lg rounded-lg shadow-xl overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 flex flex-col justify-between">
      {/* Title & Price */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">{name}</h2>
        <div className="flex items-center mb-0">
          <span className="text-xl font-semibold text-white">Veg Price:</span>
          <span className="font-bold text-2xl text-yellow-300 ml-2"> ₹{vegPrice}</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="text-xl font-semibold text-white">Non-Veg Price:</span>
          <span className="font-bold text-2xl text-yellow-300 ml-2"> ₹{nonVegPrice}</span>
        </div>
      </div>

      {/* Wishlist Button */}
      <button
        className={`${
          isWishlistSelected ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
        } py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 mb-6 w-full`}
        onClick={handleWishlistClick}
      >
        {isWishlistSelected ? "Added to Wishlist" : "Add to Wishlist"}
      </button>

      {/* Enquiry Button */}
      <button
        onClick={hasSentEnquiry ? handleEnquirySentClick : () => setIsModalOpen(true)}
        className="bg-white text-indigo-700 hover:text-indigo-800 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none"
      >
        {hasSentEnquiry ? "Enquiry Sent" : "Send Enquiry"}
      </button>

      {/* Enquiry Modal */}
      {!hasSentEnquiry && (
        <EnquiryFormModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={handleEnquirySubmit}
        />
      )}

      {/* OTP Popup */}
      {showOtpPopup && <OtpPopup otp={otp} />}
    </div>
  );
};

export default VenuePriceCard;
