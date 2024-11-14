import React from "react";
import { FaSearch } from "react-icons/fa";
// import AllVendors from "../components/card/AllVendors";
import ArticleCard from "../components/card/ArticleCard";
import WeddingCategories from "../components/WeddingCateg";
import NavBar from "../components/navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useAllVendorQuery } from "../redux/api/vendor";
import type { Vendor } from "../types/types";
import VendorCard from "../components/card/Vendorcard";
import { useParams } from "react-router-dom";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import SkeletonCard from "../components/skeleton/Vendor";
import { useGetAllBlogsQuery } from "../redux/api/blog";
import AllVendors from "../components/card/AllVendors";

interface VendorsListProps {
  NumberOfCards?: number;
  Description?: string;
  Search?: string;
  Img?: string;
  ImgTitle2?: string;
  NumberOfArticleCards?: number;
}

const VendorsList: React.FC<VendorsListProps> = ({
  // NumberOfArticleCards = 10,
  Search = "Search Artists By Name",
  // Img = "/wv_cover.jpg",
  // ImgTitle2 = "weddingImage",
}) => {
  // const ArticleCardsArray = Array.from({ length: NumberOfArticleCards });
  const { data, error, isLoading } = useAllVendorQuery("");
  const [allVendors, setAllVendors] = useState<Vendor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const { type } = useParams<{ type: string }>();
  const Title = type;

  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 10;
  const { data: blog } = useGetAllBlogsQuery('');
  const blogs = blog?.data.blog || [];
  const vendors = [
    {
      name: "Vendor One",
      email: "vendor1@example.com",
      password: "password123",
      phone: "1234567890",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      businessName: "Vendor One Business",
      type_Of_Business: "Photographer",
      packages: {
        name: "Basic",
        days: "3",
        price: "500",
        minAdvance: "100",
      },
      portfolio: ["/public/home3.jpg", "/public/home4.jpg"],
      experience: "5 years",
      event_completed: 50,
      willingToTravel: true,
      isVerified: "Approved",
      usp: "Best quality service",
      summary: "Top vendor with great reviews",
      price: "500-1000",
      bookingPolicy: "50% advance",
      cancellationPolicy: "Non-refundable",
      termAndConditions: "Terms apply",
      review: [],
      refreshToken: "",
    },
    {
      name: "Vendor Two",
      email: "vendor2@example.com",
      password: "password123",
      phone: "2345678901",
      address: "456 Elm St",
      city: "Los Angeles",
      state: "CA",
      businessName: "Vendor Two Business",
      type_Of_Business: "Caterer",
      packages: {
        name: "Standard",
        days: "5",
        price: "1500",
        minAdvance: "500",
      },
      portfolio: ["/public/home4.jpg"],
      experience: "3 years",
      event_completed: 30,
      willingToTravel: false,
      isVerified: "Pending",
      usp: "Best food quality",
      summary: "Experienced catering service",
      price: "1000-2000",
      bookingPolicy: "30% advance",
      cancellationPolicy: "Refundable within 7 days",
      termAndConditions: "Subject to change",
      review: [],
      refreshToken: "",
    },
    {
      name: "Vendor Three",
      email: "vendor3@example.com",
      password: "password123",
      phone: "3456789012",
      address: "789 Pine St",
      city: "Chicago",
      state: "IL",
      businessName: "Vendor Three Photography",
      type_Of_Business: "Photographer",
      packages: {
        name: "Premium",
        days: "7",
        price: "2500",
        minAdvance: "800",
      },
      portfolio: ["/public/home1.jpg", "/public/home2.jpg", "/public/home4.jpg"],
      experience: "8 years",
      event_completed: 80,
      willingToTravel: true,
      isVerified: "Approved",
      usp: "Creative photography",
      summary: "Capturing moments beautifully",
      price: "2000-3000",
      bookingPolicy: "40% advance",
      cancellationPolicy: "Non-refundable",
      termAndConditions: "Check website for details",
      review: [],
      refreshToken: "",
    },
    {
      name: "Vendor Four",
      email: "vendor4@example.com",
      password: "password123",
      phone: "4567890123",
      address: "101 Maple St",
      city: "Houston",
      state: "TX",
      businessName: "Events By Vendor Four",
      type_Of_Business: "Event Planning",
      packages: {
        name: "Deluxe",
        days: "10",
        price: "5000",
        minAdvance: "2000",
      },
      portfolio: ["/public/home4.jpg"],
      experience: "10 years",
      event_completed: 100,
      willingToTravel: true,
      isVerified: "Approved",
      usp: "Complete event management",
      summary: "End-to-end solutions",
      price: "4000-6000",
      bookingPolicy: "50% advance",
      cancellationPolicy: "No refund on cancellation",
      termAndConditions: "Subject to change",
      review: [],
      refreshToken: "",
    },
    {
      name: "Vendor Five",
      email: "vendor5@example.com",
      password: "password123",
      phone: "5678901234",
      address: "202 Oak St",
      city: "Phoenix",
      state: "AZ",
      businessName: "Vendor Five Catering",
      type_Of_Business: "Caterer",
      packages: {
        name: "Wedding Package",
        days: "2",
        price: "800",
        minAdvance: "200",
      },
      portfolio: ["/public/home4.jpg"],
      experience: "4 years",
      event_completed: 40,
      willingToTravel: false,
      isVerified: "Pending",
      usp: "Delicious custom cakes",
      summary: "Specialized in wedding cakes",
      price: "500-1000",
      bookingPolicy: "25% advance",
      cancellationPolicy: "Refundable with 5-day notice",
      termAndConditions: "Check contract",
      review: [],
      refreshToken: "",
    },
    {
      name: "Vendor Six",
      email: "vendor6@example.com",
      password: "password123",
      phone: "6789012345",
      address: "303 Cedar St",
      city: "San Antonio",
      state: "TX",
      businessName: "Music by Vendor Six",
      type_Of_Business: "Dj",
      packages: {
        name: "Live Performance",
        days: "1",
        price: "1500",
        minAdvance: "500",
      },
      portfolio: ["/public/home4.jpg"],
      experience: "6 years",
      event_completed: 60,
      willingToTravel: true,
      isVerified: "Rejected",
      usp: "Energetic live shows",
      summary: "High-quality live music",
      price: "1000-2000",
      bookingPolicy: "50% advance",
      cancellationPolicy: "Non-refundable",
      termAndConditions: "No overtimes",
      review: [],
      refreshToken: "",
    },
    {
      name: "Vendor Seven",
      email: "vendor7@example.com",
      password: "password123",
      phone: "7890123456",
      address: "404 Birch St",
      city: "Dallas",
      state: "TX",
      businessName: "Vendor Seven Decorations",
      type_Of_Business: "Decorator",
      packages: {
        name: "Complete Decor",
        days: "5",
        price: "3000",
        minAdvance: "1000",
      },
      portfolio: ["/public/home4.jpg"],
      experience: "7 years",
      event_completed: 70,
      willingToTravel: true,
      isVerified: "Approved",
      usp: "Elegant decor",
      summary: "Transforming venues beautifully",
      price: "2000-4000",
      bookingPolicy: "30% advance",
      cancellationPolicy: "Refundable within 3 days",
      termAndConditions: "Custom terms apply",
      review: [],
      refreshToken: "",
    },
    {
      name: "Vendor Eight",
      email: "vendor8@example.com",
      password: "password123",
      phone: "8901234567",
      address: "505 Spruce St",
      city: "Austin",
      state: "TX",
      businessName: "Vendor Eight Videography",
      type_Of_Business: "Photographer",
      packages: {
        name: "Full Coverage",
        days: "2",
        price: "3500",
        minAdvance: "1200",
      },
      portfolio: ["/public/home4.jpg"],
      experience: "9 years",
      event_completed: 90,
      willingToTravel: true,
      isVerified: "Approved",
      usp: "Professional video quality",
      summary: "Capturing moments in motion",
      price: "3000-4000",
      bookingPolicy: "50% advance",
      cancellationPolicy: "No refund after booking",
      termAndConditions: "Terms may vary",
      review: [],
      refreshToken: "",
    },
  ];
  


  useEffect(() => {
    if (data) {
      setAllVendors(data.data.vendors);
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    // const approvedVendors = allVendors.filter(vendor => vendor.isVerified === "Approved");
    const approvedVendors = vendors;
    let filtered = approvedVendors;
    
    if (searchQuery.trim() !== "") {
      filtered = approvedVendors.filter((vendor) =>
        vendor.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (Title !== "AllVendors") {
      filtered = filtered.filter((vendor) => vendor.type_Of_Business.toLowerCase() === Title?.toLowerCase());
    }
    
    setFilteredVendors(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, allVendors, Title]);
  
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // if (error) {
  //   return <h1>Error while loading data</h1>;
  // }

  // console.log("heloo", filteredVendors.length, totalPages, currentPage, vendorsPerPage, currentVendors)

  return (
    <>
      <NavBar />
      {Title==="AllVendors" && <WeddingCategories/>}
      <div className="flex flex-col lg:flex-row bg-white">
        <div className="lg:w-3/4 p-4 w-full">
          <div className="bg-white rounded-md">
            <p className="text-xl font-bold mx-3 pt-1">
              {Title === "AllVendors"
                ? "All Vendors"
                : Title === "Photographer"
                  ? "Photographers"
                  : Title === "MakeupArtist"
                    ? "Makeup Artists"
                    : Title === "MehendiArtist"
                      ? "Mehendi Artists"
                      : Title === "Decorator"
                        ? "Decorators"
                        : Title === "Caterer"
                          ? "Caterers"
                          : Title === "Band baja"
                            ? "Band Baja"
                            : Title === "dhol"
                              ? "Dhol"
                              : Title === "Tatto Artist"
                                ? "Tatto Artists"
                                : Title === "Messkot"
                                  ? "Messkot"
                                  : Title === "Magicians"
                                    ? "Magicians"
                                    : Title === "Fog Event"
                                      ? "Fog Events"
                                      : Title === "Game Coordinator"
                                        ? "Game Coordinators"
                                        : Title === "Anchor"
                                          ? "Anchor"
                                          : Title === "Live singer"
                                            ? "Live Singers"
                                            : Title === "Welcome Girls"
                                              ? "Welcome Girls"
                                              : Title === "Waiter service boy"
                                                ? "Waiter service boys"
                                                : Title === "Vallet parking vendor"
                                                  ? "Vallet parking vendors"
                                                  : Title === "Dj"
                                                    ? "Dj"
                                                    : Title === "Birthday boy car Entry"
                                                      ? "Birthday boy car Entries"
                                                      : Title === "Jagran setup"
                                                        ? "Jagran setups"
                                                        : Title === "Mata ki Chowki setup"
                                                          ? "Mata ki Chowki setups"
                                                          : Title === "Bar tender boy"
                                                            ? "Bar tender boys"
                                                            : Title === "Rooms booking"
                                                              ? "Rooms bookings"
                                                              : Title}
            </p>
            <p className="text-md font-semibold text-gray-600">

              {/* {Title === "AllVendors" ? "Vendors" : Title} */}
            </p>
          </div>

          <hr className="h-1 bg-white my-2"></hr>

          <div className="bg-white grid grid-cols-1 sm:grid-cols-2 gap-6 py-5 justify-center rounded-md">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
            ) : currentVendors.length > 0 ? (
              currentVendors.map((vendor, index) => {
                if (Title === "AllVendors") {
                  return (
                    <VendorCard
                      _id={vendor._id}
                      key={index}
                      businessName={vendor.name ?? "No name provided"}
                      city={vendor.city}
                      packagePrice={vendor.packages?.price}
                      summary={vendor.summary}
                      image={vendor.portfolio ? vendor.portfolio[0] : ""}
                    />
                  );
                } else if (vendor.type_Of_Business?.toLowerCase() === Title?.toLowerCase()) {
                  return (
                    <VendorCard
                      _id={vendor._id}
                      key={index}
                      businessName={vendor.name ?? "No name provided"}
                      city={vendor.city}
                      packagePrice={vendor.packages?.price}
                      summary={vendor.summary}
                      image={vendor.portfolio ? vendor.portfolio[0] : ""}
                    />
                  );
                }
              })
            ) : (
              <h1>No vendors available</h1>
            )}
          </div>



          <div className="flex justify-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center px-2 py-1 mx-1 bg-[#A31F24] text-white rounded sm:px-4 sm:py-2 sm:mx-2"
            >
              <LuArrowLeft />
            </button>
            <span className="px-2 py-1 mx-1 bg-gray-200 text-black rounded sm:px-4 sm:py-2 sm:mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center px-2 py-1 mx-1 bg-[#A31F24] text-white rounded sm:px-4 sm:py-2 sm:mx-2"
            >
              <LuArrowRight />
            </button>
          </div>
        </div>

        {/* Second section (responsive) */}
        <div className="lg:w-1/4 w-full bg-white p-4">
          <div className="justify-end">
            <p className="text-xl font-bold">{Search}</p>
            <hr className="h-1 bg-gray-200 my-2"></hr>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter artist name..."
                className="w-full px-3 py-2 border rounded-l-md outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-blue-400 text-white px-4 py-2 rounded-r-md">
                <FaSearch />
              </button>
            </div>
            <hr className="h-1 bg-gray-200 my-2"></hr>
            <div className="shadow-xl bg-white">
              <AllVendors />
            </div>

            {/* <img src={Img} alt={ImgTitle2} className="w-full h-[250px] p-3 shadow-xl object-cover" /> */}
            <p className="text-xl font-semibold pt-3 pb-2">Related Article</p>

            <div className="flex flex-wrap justify-center shadow">
              {blogs?.map((items: any, index: any) => (
                index < 10 ? (
                  <div key={index} className="mx-4 mb-4 shadow-xl">
                    <ArticleCard
                      id={items?._id}
                      image={items?.images[0]}
                      title={items?.title}
                      description={items?.content}
                      date={items?.createdAt}
                    />
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VendorsList;

{/* <ArticleCard
id={items?._id}
  image={items?.images[0]}
  title={items?.title}
  description={items?.content}
  date={items?.createdAt}
/> */}