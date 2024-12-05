import { useState, useEffect, useCallback } from 'react';
import VenueCardMain from '../components/VenueCardMain';
// import { FaMapMarkerAlt, FaPhone, FaUserFriends, FaUtensils } from 'react-icons/fa';
import NavBar from '../components/navbar';
import RelatedArticles from '../components/RelatedArticles';
import Footer from '../components/Footer';
import { Venue } from '../types/types';
import { useAllVenueQuery } from '../redux/api/venue';
import Loader from '../components/skeleton/Loader';
import FilterBar from '../components/FilterBar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function VenueList() {

  const { pathname, search } = useLocation();
  const [filters, setFilters] = useState({});
  const { data, error, isLoading } = useAllVenueQuery(filters);
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const updateVenues = useCallback(() => {
    if (data && Array.isArray(data.data)) {
      setAllVenues(data.data);
    }
  }, [data]);
  const city = useSelector((state: RootState) => state?.auth?.city)
  console.log("data", city,)
  useEffect(() => {
    console.log('ScrollToTop: Route changed to', pathname, search);
    window.scrollTo(0, 0);
  },);

  const queryString = new URLSearchParams(
    Object.entries(filters)
      .filter(([, v]) => v !== undefined && v !== null && v !== '') // Remove undefined, null, empty string
      .map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(',') : String(value), // Convert arrays to comma-separated strings
      ])
  ).toString();

  useEffect(() => {
    updateVenues();
  }, [updateVenues]);

  const allowedVenues = allVenues.filter(
    (venue) => venue.isVerified === "Approved"
  );

  // Filter venues based on search query
  const filteredVenues = allowedVenues.filter((venue) =>
    [venue.businessName, venue.state, venue.city]
      .filter(Boolean) // Remove undefined or null values from the array
      .some((field) =>
        field?.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );


  const handleFilterChange = (newFilters: any) => {
    // Remove undefined values from filters
    const cleanFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([, v]) => v != null && v !== '')
    );
    setFilters(cleanFilters);
    console.log(queryString);
  };

  if (error) {
    return <h1>Error while loading data</h1>;
  }

  if (isLoading) {
    return <Loader />;
  }


  return (
    <div className="flex flex-col min-h-screen  bg-white">
      <NavBar />
      <div className="w-full mt-4">
        <FilterBar onFilterChange={handleFilterChange} />
      </div>
      {/* Search Bar */}
      <div className="w-full container mx-auto px-4 mt-8">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, state, or city..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {filteredVenues.length > 0 ? (
            filteredVenues.map((venue, index) => (
              <VenueCardMain
                key={index}
                venue={{
                  name: venue?.businessName,
                  state: venue.state,
                  city: venue.city,
                  maxGuests: venue.guestCapacity,
                  contact: venue.phone,
                  description: venue.summary,
                  vegPrice: venue.foodPackages?.match(/\d+/) ? venue.foodPackages?.match(/\d+/)?.[0] : "N/A",
                  nonVegPrice: "N/A",
                  images: venue.images,
                  id: venue._id,
                }}
              />
            ))
          ) : (
            <div className="col-span-full text-center">No Venue found</div>
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