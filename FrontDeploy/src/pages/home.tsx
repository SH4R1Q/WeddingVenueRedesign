import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../components/navbar";
import InformationBanner from "../components/InformationBanner";
import Footer from "../components/Footer";
import { useRankedVenuesQuery } from "../redux/api/venue";
import { useGetAllBlogsQuery } from '../redux/api/blog';
import { useGetAllRealWeddingsQuery } from '../redux/api/realWeddings';
import VenueCard from "../components/VenueCard";
import SkeletonBlogCard from "../components/skeleton/Blog";
import SkeletonRealWeddingCard from "../components/skeleton/RealWedding";

import { Blog, RealWeddings } from '../types/types';
import { useGetAllCitiesQuery } from '../redux/api/user';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { cityStatus } from '../redux/reducer/auth';
import Universal from "../components/skeleton/Universal"

const imageUrl = "/wv_cover2.jpg";

const Home: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const venuesRef = useRef<HTMLDivElement>(null);

  const { data: venuesData, isLoading: isLoadingVenues, error: venuesError } = useRankedVenuesQuery();
  const { data: blogData, isLoading: isLoadingBlogs, error: blogsError } = useGetAllBlogsQuery('');
  const { data: realWeddingsData, isLoading: isLoadingRealWeddings, error: realWeddingsError } = useGetAllRealWeddingsQuery();
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
    ? 'status' in venuesError
      ? `Error: ${venuesError.status} - ${JSON.stringify(venuesError.data)}`
      : venuesError.message
    : null;

  const errorMessageBlogs = blogsError
    ? 'status' in blogsError
      ? `Error: ${blogsError.status} - ${JSON.stringify(blogsError.data)}`
      : blogsError.message
    : null;

  const errorMessageRealWeddings = realWeddingsError
    ? 'status' in realWeddingsError
      ? `Error: ${realWeddingsError.status} - ${JSON.stringify(realWeddingsError.data)}`
      : realWeddingsError.message
    : null;

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityValue = event.target.value;
    setSelectedCity(cityValue);
    dispatch(cityStatus(cityValue));

    // Scroll to the venues section
    if (cityValue && venuesRef.current) {
      venuesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // console.log("cityy: ", selectedCity);

  return (
    <div>
      <NavBar />
      <div className="relative">
        <div
          className="bg-cover bg-center h-[95vh]"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}

        >
          <div className="absolute bg-pink-100-a rounded-xl top-[6rem] left-1/2 mt-4 transform -translate-x-1/2 -translate-y-24 w-[50%]">
            <h1 className="text-4xl font-bold text-center mb-4 text-white font-marcellus pt-4"
              style={{ textShadow: '1px 1px 10px black, 0 0 4em black, 0 0 2em white' }}>
              Weddingz Venue
            </h1>
            <h2 className="text-2xl font-bold text-center mb-4 text-white font-roboto" style={{ textShadow: '1px 1px 10px black, 0 0 4em black, 0 0 2em white' }}>
              The Best Place To Plan Your Wedding
            </h2>

            <div className="relative flex justify-center mb-4">
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="w-1/2 px-1 py-2 sm:px-10 sm:py-3 border border-gray-300 opacity-80
                 rounded-xl bg-white bg-opacity-90 text-gray-900 
                  focus:ring focus:ring-indigo-300 focus:outline-none transition duration-300"
              >
                <option value="">Select City</option>
                {cities.map((city: any) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-12 bg-pink-100" ref={venuesRef}>
        {venues
          .filter((venue: any) => selectedCity ? venue.city.toLowerCase() === selectedCity.toLowerCase() : true) && (
            <h2 className="text-3xl text-gray-900 font-bold font-marcellus text-center mb-8">Top Rated Venues</h2>
          )}
        {isLoadingVenues ? (
          <Universal />
        ) : venuesError ? (
          <div>{errorMessageVenues}</div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 scale-90">
              {venues
                .filter((venue: any) => selectedCity ? venue.city.toLowerCase() === selectedCity.toLowerCase() : true)
                .map((venue: any, index: any) => (
                  <VenueCard
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
        <div className='flex justify-center'>
          <Link to={{ pathname: '/venuelist' }}>
            <button className="bg-transparent hover:!bg-[#bd87a5] mb-12 text-pink-600 border-2 border-solid border-[#92396a] font-bold py-2 px-4 rounded-full focus:outline-none text-sm md:text-lg">
              View More
            </button>
          </Link>
        </div>
      </div>

      <div className="pb-12 px-12 bg-pink-100">
        <h2 className="text-3xl text-gray-900 font-bold font-marcellus text-center mb-20">Latest Blog Posts</h2>
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
            {blogs.slice(0, 4).map((blog: Blog) => {
              const imageUrl = Array.isArray(blog.images) ? blog.images[0] : blog.images || '/default-image.jpg';
              const contentPreview = blog.content ? blog.content.substring(0, 200) : 'No content available';
              return (
                <div key={blog._id} className="group border border-2 rounded-lg overflow-hidden !shadow-lg 
                transition-transform transform hover:scale-105 relative !h-50 ">
                  <img src={imageUrl} alt={blog.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                    <h2 className="text-white text-shadow-sm text-2xl font-bold px-4 text-center">{blog.title}</h2>
                  </div>
                  <div className="absolute inset-0 p-4 bg-white-500-a transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-semibold text-gray-600">{contentPreview}...</p>
                    <Link to={`/blogs/${blog._id}`} className="text-pink-600 hover:underline mt-2 block">
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No blogs available</p>
        )}
        <div className='flex justify-center mt-8'>
          <Link to={{ pathname: '/blogs' }}>
            <button className="bg-transparent hover:!bg-[#bd87a5] mb-8 text-pink-600 border-2 border-solid border-[#92396a] font-bold py-2 px-4 rounded-full focus:outline-none text-sm md:text-lg">
              View More
            </button>
          </Link>
        </div>
      </div>

      {/* <div className="pb-12 px-12 bg-pink-100">
        <h2 className="text-3xl text-gray-900 font-bold text-center mb-12">Real Wedding Posts</h2>
        {isLoadingRealWeddings ? (
          <div className="grid gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonRealWeddingCard key={index} />
            ))}
          </div>
        ) : realWeddingsError ? (
          <div>{errorMessageRealWeddings}</div>
        ) : realWeddings.length > 0 ? (
          <div className="grid gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {realWeddings.slice(0, 4).map((wedding: RealWeddings) => {
              const imageUrl = wedding.images && wedding.images.length > 0 ? wedding.images[0] : '/default-image.jpg';
              const contentPreview = wedding.content ? wedding.content.substring(0, 100) : 'No content available';
              return (
                <div key={wedding._id} className="border rounded-lg overflow-hidden shadow-lg">
                  <img src={imageUrl} alt={wedding.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{wedding.title}</h2>
                    <p className="text-gray-700">{contentPreview}...</p>
                    <Link to={`/realWedding/${wedding._id}`} className="text-blue-500 hover:underline mt-2 block">
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No real weddings available</p>
        )}
      </div> */}

      <div className="pb-12 px-12 bg-pink-100">
        <h2 className="text-3xl text-gray-900 font-bold font-marcellus text-center mb-12">Real Wedding Highlights</h2>
        {isLoadingRealWeddings ? (
          <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonRealWeddingCard key={index} />
            ))}
          </div>
        ) : realWeddingsError ? (
          <div className="text-center text-red-500">{errorMessageRealWeddings}</div>
        ) : realWeddings.length > 0 ? (
          <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {realWeddings.slice(0, 4).map((wedding: RealWeddings) => {
              const imageUrl = wedding.images && wedding.images.length > 0 ? wedding.images[0] : '/default-image.jpg';
              const contentPreview = wedding.content ? wedding.content.substring(0, 190) : 'Details coming soon!';
              return (
                <div
                  key={wedding._id}
                  className="bg-white border border-2 !border-pink-100 shadow-xl overflow-hidden relative group"
                >
                  <img src={imageUrl} alt={wedding.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end justify-center p-5">
                    <h2 className="text-xl font-bold font-marcellus text-white group-hover:opacity-0">{wedding.title}</h2>
                  </div>

                  {/* <div className="absolute bottom-0 w-full p-5 bg-white bg-opacity-90 transform 
                            transition-transform duration-300 group-hover:-translate-y-2/3"
            > */}.
                  <div className="absolute inset-0 p-5 bg-white-500-a transform 
                transition-all duration-300 translate-y-full group-hover:translate-y-0 flex flex-col justify-start"
                  >

                    <h2 className="text-xl font-bold font-marcellus text-gray-800 mb-4">{wedding.title}</h2>
                    <p className="text-lg font-semibold text-gray-700 mt-2">{contentPreview}...</p>
                    <Link to={`/realWedding/${wedding._id}`} className="text-pink-600 hover:underline mt-3 inline-block">
                      Discover More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-700">Currently no weddings available. Stay tuned for updates!</p>
        )}
      </div>



      <div className="bg-white">
        <InformationBanner />
      </div>
      <Footer />
    </div>
  );
};

export default Home;