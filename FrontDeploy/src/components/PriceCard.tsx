import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import EnquiryFormModal from "./EnquiryFormModal";
import { useAddBookingEnquiryMutation, useGetBookingbyIdQuery } from "../redux/api/booking";
import VenueContactCard from "./VenueContactCard";
interface PriceCardProps {
  name: string | undefined
  price?: string | undefined;
  contactNumber?: string | undefined;
  email?: string |undefined;
  detailPackage?: {
  name: string,
  days: string,
  price: string,
  minAdvance: string
} | undefined
}

const OtpPopup: React.FC<{ otp: string | undefined }> = ({ otp }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg text-gray-800 font-semibold mb-2">Your OTP</h3>
      <p className="text-xl text-black font-bold">{otp || "N/A"}</p>
    </div>
  </div>
);

const PriceCard: React.FC<PriceCardProps> = ({ name, contactNumber,email, price,  detailPackage }) => {
  const userId = useSelector((state: RootState) => state?.auth?.user?._id);
  const { id: vendorId } = useParams<{ id: string }>();
  const [isEnquirySelected, setIsEnquirySelected] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const togglePricingInfo = () => {
    setIsExpanded(!isExpanded);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSentEnquiry, setHasSentEnquiry] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [sendEnquiry] = useAddBookingEnquiryMutation();
  const { data: bookingData } = useGetBookingbyIdQuery({
    vId: vendorId as string,
  });

  const otp = bookingData?.bookingId;

  const itemId = vendorId;
  useEffect(() => {
    if (bookingData?.message === "True") {
      setHasSentEnquiry(true);
    }
  }, [bookingData]);

  const handleContactModal = () => {
    setIsModalOpen(!isModalOpen)
  }

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
    <div className="bg-white shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800">Starting Price</h3>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-700">{detailPackage?.name}</span>
        <span className="text-gray-900 font-bold">₹ {price}</span>
      </div>
      <button
        onClick={togglePricingInfo}
        className="text-pink-600 text-sm mt-4 flex items-center"
      >
        {isExpanded ? "Hide Pricing Info ▲" : "Pricing Info ▼"}
      </button>
      {isExpanded && (
        <div className="mt-4 text-sm text-gray-600">
          <p><span className="font-semibold">Name : </span>{detailPackage?.name}</p>
          <p><span className="font-semibold">Days : </span>{detailPackage?.days}</p>
          <p><span className="font-semibold">Price : </span>{detailPackage?.price}</p>
          <p><span className="font-semibold">Advance : </span>{detailPackage?.minAdvance}</p>
          <br/><hr />
          <p className="font-semibold">Pricing may vary based on the requirements.</p>
        </div>
      )}
      <button
        className={`${hasSentEnquiry
          ? "bg-pink-600"
          : "bg-pink-700"
          } text-white font-semibold py-2 px-4 w-full mt-6 rounded-md hover:bg-pink-600`}
        onClick={hasSentEnquiry ? handleEnquirySentClick : () => setIsEnquirySelected(!isEnquirySelected)}
      >
        {hasSentEnquiry ? "Enquiry Sent" : "Send Enquiry"}
      </button>
      <button
        className="bg-green-600 text-white font-semibold py-2 px-4 w-full my-2 rounded-md hover:bg-green-700"
        onClick={handleContactModal}
      >
        {isModalOpen ? "Hide Contact" : "View Contact"}
      </button>

      {!hasSentEnquiry && (
        <EnquiryFormModal
          isOpen={isEnquirySelected}
          onRequestClose={() => setIsEnquirySelected(false)}
          onSubmit={handleEnquirySubmit}
          isLoggedIn={true}
        />
      )}
      {showOtpPopup && <OtpPopup otp={otp} />}
      {isModalOpen && (
        <VenueContactCard
          venueName={name}
          contactNumber={contactNumber}
          email={email}
          isLoggedIn={userId ? true : false}
        />
      )}
    </div>
  );
};

export default PriceCard;
