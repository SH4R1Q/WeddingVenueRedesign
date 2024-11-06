import { useState, useEffect, useCallback } from 'react';
// import VenueCard from '../components/VenueCard';
import { FaMapMarkerAlt, FaPhone, FaUserFriends, FaUtensils } from 'react-icons/fa';
import NavBar from '../components/navbar';
import RelatedArticles from '../components/RelatedArticles';
import Footer from '../components/Footer';
import { Venue } from '../types/types';
import { useAllVenueQuery } from '../redux/api/venue';
import Universal from '../components/skeleton/Universal';
import FilterBar from '../components/FilterBar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useLocation } from 'react-router-dom';

function VenueList() {

  const { pathname, search } = useLocation();

  useEffect(() => {
    console.log('ScrollToTop: Route changed to', pathname, search);
    window.scrollTo(0, 0);
  },);


  const [filters, setFilters] = useState({});
  const queryString = new URLSearchParams(
    Object.entries(filters).filter(([, v]) => v !== undefined) as [string, string][]
  ).toString();
  const { data, error, isLoading } = useAllVenueQuery(queryString);
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  // console.log('helod', data)
  const updateVenues = useCallback(() => {
    if (data && Array.isArray(data.data)) {
      setAllVenues(data.data);
    }
  }, [data]);

  const city = useSelector((state: RootState) => state?.auth?.city)
  console.log("data", city,)

  useEffect(() => {
    updateVenues();
  }, [updateVenues]);

  const allowedVenues = allVenues.filter(
    (venue) => venue.isVerified === "Approved"
  );

  const handleFilterChange = (newFilters: any) => {
    // Remove undefined values from filters
    const cleanFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([, v]) => v != null && v !== '')
    );
    setFilters(cleanFilters);
  };

  if (error) {
    return <h1>Error while loading data</h1>;
  }

  if (isLoading) {
    return <Universal />;
  }


  return (
    <div className="flex flex-col min-h-screen  bg-pink-50">
      <NavBar />
      <div className="w-full mt-4">
        <FilterBar onFilterChange={handleFilterChange} />
      </div>
      {/* <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 gap-4">
              {allowedVenues.length > 0 ? (
                allowedVenues.map((venue, index) => (

                  <VenueCard
                    key={index}
                    venue={{
                      name: venue?.businessName,
                      location: venue.city,
                      maxGuests: venue.guestCapacity,
                      contact: venue.phone,
                      description: venue.summary,
                      vegPrice: venue.foodPackages,
                      nonVegPrice: 30,
                      images: venue.images,
                      id: venue._id,
                    }}
                  />)
                )
              ) : (
                <div>No Venue found</div>
              )}
            </div>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allowedVenues.length > 0 ? (
            allowedVenues.map((venue, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={venue.images?.[0] || '/default-image.jpg'}
                  alt={venue.businessName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {venue.businessName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {venue.summary}
                  </p>
                  <div className="flex items-center text-gray-700 text-sm mb-2">
                    <FaMapMarkerAlt className="mr-2" /> {venue.city}
                  </div>
                  <div className="flex items-center text-gray-700 text-sm mb-2">
                    <FaUserFriends className="mr-2" /> Max Guests: {venue.guestCapacity}
                  </div>
                  <div className="flex items-center text-gray-700 text-sm mb-4">
                    <FaUtensils className="mr-2" /> Price per Plate: {venue.foodPackages?.substring(0, 5)} Onwards
                  </div>
                  <a
                    href={`tel:${venue.phone}`}
                    className="text-blue-500 hover:text-blue-600 flex items-center"
                  >
                    <FaPhone className="mr-2" /> {venue.phone}
                  </a>
                </div>
                <button
                  className="w-full bg-[#e363aa] text-white py-2 mt-4 hover:bg-[#d35399] transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center col-span-full">No Venue Found</div>
          )}
        </div>
      </div>
      <div className="mt-8">
        <RelatedArticles />
      </div>
      <Footer />
    </div>
  );
}

export default VenueList;