import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import { useRankedVenuesQuery } from "../redux/api/venue";
import { useGetAllBlogsQuery } from "../redux/api/blog";
import { useGetAllRealWeddingsQuery } from "../redux/api/realWeddings";
import { useGetAllCitiesQuery } from "../redux/api/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { cityStatus } from "../redux/reducer/auth";
import Universal from "../components/skeleton/Universal";
import VenueCardNew from "../components/VenueCardNew";
import { Link } from "react-router-dom";
import SkeletonBlogCard from "../components/skeleton/Blog";
import BlogCard from "../components/BlogCard";

const images = [
  "/public/home1.jpg",
  "/public/home2.jpg",
  "/public/home3.jpg",
  "/public/home4.jpg",
];

const NewHome: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedCity, setSelectedCity] = useState<string>("");
  const venuesRef = useRef<HTMLDivElement>(null);

  const {
    data: venuesData,
    isLoading: isLoadingVenues,
    error: venuesError,
  } = useRankedVenuesQuery();
  const {
    data: blogData,
    isLoading: isLoadingBlogs,
    error: blogsError,
  } = useGetAllBlogsQuery("");
  const {
    data: realWeddingsData,
    isLoading: isLoadingRealWeddings,
    error: realWeddingsError,
  } = useGetAllRealWeddingsQuery();
  const { data: cityData } = useGetAllCitiesQuery();

  const dispatch = useDispatch<AppDispatch>();

  // setAllvenue(ven)
  // console.log(sumit)

  const venues = venuesData?.data || [];
  const blogs = blogData?.data.blog || [];
  const realWeddings = realWeddingsData?.data.realWeddings || [];
  const cities = cityData?.cities || [];

  const city = useSelector((state: RootState) => state?.auth?.city);
  console.log("data", city);
  // console.log("sokhi" , venues)

  // Handle error appropriately based on its type
  const errorMessageVenues = venuesError
    ? "status" in venuesError
      ? `Error: ${venuesError.status} - ${JSON.stringify(venuesError.data)}`
      : venuesError.message
    : null;

  const errorMessageBlogs = blogsError
    ? "status" in blogsError
      ? `Error: ${blogsError.status} - ${JSON.stringify(blogsError.data)}`
      : blogsError.message
    : null;

  const errorMessageRealWeddings = realWeddingsError
    ? "status" in realWeddingsError
      ? `Error: ${realWeddingsError.status} - ${JSON.stringify(
          realWeddingsError.data
        )}`
      : realWeddingsError.message
    : null;

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityValue = event.target.value;
    setSelectedCity(cityValue);
    dispatch(cityStatus(cityValue));

    // Scroll to the venues section
    if (cityValue && venuesRef.current) {
      venuesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar />

      <section id="heroSection">
        {/* Carousel Section */}
        <div className="relative w-screen h-screen overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center w-full h-full transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </div>

          {/* Content Container */}
          <div className="relative flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="w-[1200px] text-center transform -translate-y-24">
              <h1
                className="text-5xl font-bold font-marcellus text-white"
                style={{
                  textShadow:
                    "1px 1px 10px black, 0 0 4em black, 0 0 2em white",
                }}
              >
                India's Largest Wedding
                <span className="text-pink-200"> Planning Platform</span>
              </h1>
              <h2
                className="text-2xl font-light font-roboto text-white mt-4"
                style={{
                  textShadow:
                    "1px 1px 10px black, 0 0 4em black, 0 0 2em white",
                }}
              >
                Find the best wedding vendors with thousands of trusted reviews
              </h2>

              {/* City Selector and Search Button */}
              <div className="flex justify-center items-center space-x-0 mt-8">
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="w-1/2 md:w-1/3 px-4 py-2 border border-gray-300 bg-white bg-opacity-90 text-gray-900 focus:ring focus:ring-indigo-300 focus:outline-none transition duration-300"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

                <button className="px-6 py-2 bg-pink-200 text-black border-0">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="topRatedVenues">
        <div className="pt-12 bg-white-500" ref={venuesRef}>
          {venues.filter((venue: any) =>
            selectedCity
              ? venue.city.toLowerCase() === selectedCity.toLowerCase()
              : true
          ) && (
            <h2 className="text-4xl text-gray-900 font-bold font-marcellus text-center mb-8">
              Top Rated Venues
            </h2>
          )}
          {isLoadingVenues ? (
            <Universal />
          ) : venuesError ? (
            <div>{errorMessageVenues}</div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 scale-90 gap-16">
                {venues
                  .filter((venue: any) =>
                    selectedCity
                      ? venue.city.toLowerCase() === selectedCity.toLowerCase()
                      : true
                  )
                  .map((venue: any, index: any) => (
                    <VenueCardNew
                      key={index}
                      venue={{
                        name: venue.businessName,
                        location: venue.city,
                        maxGuests: venue.guestCapacity,
                        contact: venue.phone,
                        description: venue.summary,
                        vegPrice: venue.foodPackages,
                        images: venue.images,
                        id: venue._id,
                      }}
                    />
                  ))}
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <Link to={{ pathname: "/venuelist" }}>
              <button className="bg-transparent hover:!bg-[#bd87a5] mb-12 text-pink-600 border-2 border-solid border-[#92396a] font-bold py-2 px-4 rounded-full focus:outline-none text-sm md:text-lg">
                View More
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-pink-50">
          <div className="!w-100 mx-auto">
            <div>
              <h2 className="text-4xl mt-8 text-gray-900 font-bold font-marcellus text-center mb-8">
                Akshit Balodhi
              </h2>
            </div>
            <div>
              {isLoadingBlogs ? (
                <div className="grid gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonBlogCard key={index} />
                  ))}
                </div>
              ) : blogsError ? (
                <div>{errorMessageBlogs}</div>
              ) : blogs.length > 0 ? (
                <div className="grid gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {blogs.slice(0, 4).map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              ) : (
                <p>No blogs available</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewHome;
