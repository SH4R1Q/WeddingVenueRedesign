import React from "react";
import "./VendorsList.css";
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
import Loader from "../components/skeleton/Loader";

interface VendorsListProps {
  NumberOfCards?: number;
  Description?: string;
  Search?: string;
  Img?: string;
  ImgTitle2?: string;
  NumberOfArticleCards?: number;
}

const VendorsList: React.FC<VendorsListProps> = () => {
  const { data, error, isLoading } = useAllVendorQuery("");
  const [allVendors, setAllVendors] = useState<Vendor[]>([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const { type } = useParams<{ type: string }>();
  const Title = type;
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 8;

  useEffect(() => {
    if (data) {
      setAllVendors(data.data.vendors);
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    const approvedVendors = allVendors.filter(vendor => vendor.isVerified === "Approved");
    // const approvedVendors = vendors;
    let filtered = approvedVendors;

    // if (searchQuery.trim() !== "") {
    //   filtered = approvedVendors.filter((vendor) =>
    //     vendor.name?.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // }

    if (Title !== "AllVendors") {
      filtered = filtered.filter((vendor) => vendor.type_Of_Business?.toLowerCase() === Title?.toLowerCase());
    }

    setFilteredVendors(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allVendors, Title]);

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

  if (error) {
    return <h1>Error while loading data</h1>;
  }

  console.log(filteredVendors.length, totalPages, currentPage, vendorsPerPage, currentVendors)

  return (
    <>
      <NavBar />
      {Title === "AllVendors" && <WeddingCategories />}
      <div className="flex flex-col lg:flex-row bg-white">
        <div className="p-4 w-full">
          <div className="bg-white rounded-md">
            {Title && <p className="text-xl font-bold mx-3 pt-1">
              {Title.replace(/([a-z])([A-Z])/g, "$1 $2")}
            </p>
            }
          </div>

          <hr className="h-1 bg-white my-2"></hr>

          <div className="bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-5 justify-center rounded-md min-h-screen">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) =>
                <>
                  <SkeletonCard key={index} />
                  <Loader />
                </>
              )
            ) : currentVendors.length > 0 ? (
              currentVendors.map((vendor, index) => {
                if (Title === "AllVendors") {
                  return (
                    <VendorCard
                      _id={vendor._id}
                      key={index}
                      businessName={vendor.name ?? "No name provided"}
                      type_of_business={vendor.type_Of_Business}
                      city={vendor.city}
                      state={vendor.state}
                      packagePrice={vendor.packages?.price}
                      experience={vendor.experience}
                      event_completed={vendor.event_completed}
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
                      type_of_business={vendor.type_Of_Business}
                      city={vendor.city}
                      state={vendor.state}
                      packagePrice={vendor.packages?.price}
                      experience={vendor.experience}
                      event_completed={vendor.event_completed}
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



          <div className="flex justify-center mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center px-2 py-1 mx-1 bg-[#1b1b1b] text-white rounded sm:px-4 sm:py-2 sm:mx-2"
            >
              <LuArrowLeft />
            </button>
            <span className="px-2 py-1 mx-1 bg-gray-200 text-black rounded sm:px-4 sm:py-2 sm:mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center px-2 py-1 mx-1 bg-[#1b1b1b] text-white rounded sm:px-4 sm:py-2 sm:mx-2"
            >
              <LuArrowRight />
            </button>
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