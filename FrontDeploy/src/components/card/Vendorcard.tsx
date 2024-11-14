// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { FaHeart } from "react-icons/fa";
// import RatingStars from "./RatingStars";
// import { useGetWishlistQuery } from "../../redux/api/wishlist";
// import { useAddBookingEnquiryMutation, useGetBookingByUserAndVenueQuery } from "../../redux/api/booking";
// import EnquiryFormModal from "../EnquiryFormModal";

// const userId = "665d6d766063ea750000e096";

// type VendorCardProps = {
//   _id: string | undefined;
//   image?: string | undefined;
//   businessName?: string;
//   rating?: number;
//   packagePrice?: string;
//   summary?: string;
//   city?: string;
// };

// const VendorCard: React.FC<VendorCardProps> = ({
//   _id,
//   image,
//   city,
//   businessName,
//   rating = 3,
//   packagePrice,
//   summary,
// }) => {
//   const { data: wishlistData } = useGetWishlistQuery(userId);
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const itemId = _id;

//   const [sendEnquiry] = useAddBookingEnquiryMutation();

//   const { data: bookingData } = useGetBookingByUserAndVenueQuery({ uId: userId, vId: itemId as string });

//   const [hasSentEnquiry, setHasSentEnquiry] = useState(false);

//   useEffect(() => {
//     if (bookingData && bookingData.message === "True") {
//       setHasSentEnquiry(true);
//     }
//   }, [bookingData]);

//   useEffect(() => {
//     if (wishlistData) {
//       const isWishlisted = wishlistData?.wishlist?.items?.some((item: any) => item.itemId === itemId) ?? false;
//       setIsInWishlist(isWishlisted);
//     }
//   }, [wishlistData, itemId]);

//   const handleEnquirySubmit = async (formData: any) => {
//     try {
//       const res = await sendEnquiry({ ...formData, vId: itemId, uId: userId }).unwrap();
//       console.log("status of the request", res);

//       if (res.message === "True") {
//         setHasSentEnquiry(true);
//       }
//     } catch (error) {
//       console.error("Failed to send enquiry:", error);
//     }
//   };

//   const type = useParams();

//   return (
//     <div className="flex justify-center px-4 sm:px-0">
//       <div className="transform scale-95 sm:scale-100 h-auto sm:h-[400px] w-full sm:w-[425px] rounded shadow-xl flex flex-col">
//         <Link to={`/vendor/${type.type}/${_id}`}>
//           <div className="relative h-[200px]">
//             <img src={image} alt={businessName} className="w-full h-full object-cover rounded-t-lg" />
//             <div
//               className={`absolute top-4 right-4 ${isInWishlist ? "text-red-600 transform scale-125" : "text-white"
//                 }`}
//             >
//               <FaHeart size={25} />
//             </div>
//           </div>
//         </Link>
//         <div className="px-4 py-2 flex-grow flex flex-col justify-between">
//           <div>
//             <div className="font-bold text-lg mb-2 text-center">
//               {businessName}, {city}
//             </div>
//             <div className="flex flex-col sm:flex-row justify-between">
//               <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
//                 <RatingStars rating={rating} />
//               </span>
//               <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2 sm:mt-0">
//                 Starting Package Price: Rs {packagePrice}
//               </span>
//             </div>
//             <p className="text-gray-700 text-sm text-center mt-2">
//               {summary}
//             </p>
//           </div>
//           <div className="text-center mt-4">
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className={`${hasSentEnquiry
//                   ? "bg-red-900 hover:bg-red-900"
//                   : "bg-red-600 hover:bg-red-700"
//                 } text-white font-extrabold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none w-full`}
//               disabled={hasSentEnquiry}
//             >
//               {hasSentEnquiry ? "Enquiry Sent" : "Send Enquiry"}
//             </button>
//             {hasSentEnquiry ? null : (
//               <EnquiryFormModal
//                 isOpen={isModalOpen}
//                 onRequestClose={() => setIsModalOpen(false)}
//                 onSubmit={handleEnquirySubmit}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorCard;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
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
  packagePrice?: string;
  summary?: string;
  city?: string;
};

const VendorCard: React.FC<VendorCardProps> = ({
  _id,
  image,
  city,
  businessName,
  rating = 3,
  packagePrice,
  summary,
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
    <div className="flex justify-center px-2">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md w-full sm:w-[300px] p-4 hover:shadow-lg transition-all duration-200 ease-in-out">
        <Link to={`/vendor/${type.type}/${_id}`}>
          <div className="relative h-[160px] rounded-md overflow-hidden mb-3">
            <img
              src={image}
              alt={businessName}
              className="w-full h-full object-cover rounded-md"
            />
            <div
              className={`absolute top-2 right-2 ${isInWishlist ? "text-pink-500" : "text-gray-300"}`}
            >
              <FaHeart size={22} />
            </div>
          </div>
        </Link>

        <div className="text-center">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">{businessName}</h3>
          <p className="text-sm text-gray-600 mb-2">{city}</p>
        </div>

        <div className="flex justify-between items-center mb-3">
          <RatingStars rating={rating} />
          <span className="text-sm font-medium text-gray-700">
            Rs {packagePrice}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3">{summary}</p>

        <button
          onClick={() => setIsModalOpen(true)}
          className={`w-full py-2 rounded-md font-medium text-white transition-all duration-200 ease-in-out ${hasSentEnquiry
            ? "bg-pink-700 cursor-not-allowed"
            : "bg-pink-500 hover:bg-pink-600"
            }`}
          disabled={hasSentEnquiry}
        >
          {hasSentEnquiry ? "Enquiry Sent" : "Send Enquiry"}
        </button>

        {!hasSentEnquiry && (
          <EnquiryFormModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            onSubmit={handleEnquirySubmit}
          />
        )}
      </div>
    </div>
  );
};

export default VendorCard;
