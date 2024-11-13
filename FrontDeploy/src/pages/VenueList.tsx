import { useState, useEffect, useCallback } from 'react';
import VenueCardMain from '../components/VenueCardMain';
// import { FaMapMarkerAlt, FaPhone, FaUserFriends, FaUtensils } from 'react-icons/fa';
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

  // const venues = [
  //   {
  //     yourName: "John Doe",
  //     businessName: "The Grand Hall",
  //     email: "grandhall@example.com",
  //     password: "password123",
  //     phone: "123-456-7890",
  //     address: "123 Main St, Downtown",
  //     city: "New York",
  //     state: "NY",
  //     comment: "A beautiful venue for weddings.",
  //     guestCapacity: "500-700",
  //     images: ["/public/ap1.jpg", "/public/ap2.jpg"],
  //     description: "A spacious hall with stunning interiors and great ambiance.",
  //     about: "Located in the heart of the city, perfect for large events.",
  //     howToReach: "Accessible via subway and buses.",
  //     venueExpertNotes: "Great for large-scale events and corporate functions.",
  //     featuresOfVenue: "Spacious hall, modern lighting, and sound system.",
  //     venuePolicies: "Outside food not allowed, valet parking available.",
  //     summary: "Top-rated venue in the city with excellent facilities.",
  //     review: [],
  //     foodPackages: "Veg: $50, Non-Veg: $70",
  //     rank: 9,
  //     isVerified: "Approved",
  //     venueType: ["Banquet Halls", "Wedding Lawns"],
  //     facilities: ["Food provided by venue", "Valet parking", "Air conditioning", "DJ services"],
  //   },
  //   {
  //     yourName: "Emily Smith",
  //     businessName: "Riverside Pavilion",
  //     email: "riverside@example.com",
  //     password: "securePass456",
  //     phone: "987-654-3210",
  //     address: "45 River Road, Uptown",
  //     city: "Los Angeles",
  //     state: "CA",
  //     comment: "Perfect for outdoor weddings with river views.",
  //     guestCapacity: "300-500",
  //     images: ["/public/ap1.jpg", "/public/ap2.jpg"],
  //     description: "An outdoor venue with picturesque river views.",
  //     about: "A beautiful riverside venue for intimate ceremonies.",
  //     howToReach: "20 mins from downtown, accessible by car.",
  //     venueExpertNotes: "Ideal for sunset weddings and photoshoots.",
  //     featuresOfVenue: "Scenic views, outdoor seating, customizable decor.",
  //     venuePolicies: "Music allowed until midnight.",
  //     summary: "A tranquil venue with stunning river views.",
  //     review: [],
  //     foodPackages: "Veg: $60, Non-Veg: $80",
  //     rank: 8,
  //     isVerified: "Approved",
  //     venueType: ["Beachside Venues", "Garden Venues"],
  //     facilities: ["Outside food allowed", "Live music", "Open bar", "Sea view"],
  //   },
  //   {
  //     yourName: "Michael Johnson",
  //     businessName: "Skyline Rooftop",
  //     email: "skyline@example.com",
  //     password: "roofTop789",
  //     phone: "555-123-4567",
  //     address: "789 High Street",
  //     city: "Chicago",
  //     state: "IL",
  //     comment: "A rooftop venue with panoramic city views.",
  //     guestCapacity: "200-300",
  //     images: ["/public/ap1.jpg", "/public/ap2.jpg"],
  //     description: "An elegant rooftop venue with a breathtaking view of the skyline.",
  //     about: "Perfect for evening events and cocktail parties.",
  //     howToReach: "Located in the city center, easy access by metro.",
  //     venueExpertNotes: "Great for evening events with stunning night views.",
  //     featuresOfVenue: "City view, modern decor, bar services.",
  //     venuePolicies: "Alcohol allowed with restrictions.",
  //     summary: "Popular for corporate events and evening parties.",
  //     review: [],
  //     foodPackages: "Veg: $70, Non-Veg: $90",
  //     rank: 7,
  //     isVerified: "Approved",
  //     venueType: ["Rooftop Venues"],
  //     facilities: ["AV equipment", "Free WiFi", "In-house decor", "DJ services"],
  //   },
  //   {
  //     yourName: "Sarah Lee",
  //     businessName: "Oceanfront Retreat",
  //     email: "oceanfront@example.com",
  //     password: "ocean1234",
  //     phone: "444-321-9876",
  //     address: "21 Beach Road",
  //     city: "Miami",
  //     state: "FL",
  //     comment: "Private beach venue perfect for seaside weddings.",
  //     guestCapacity: "100-200",
  //     images: ["/public/ap1.jpg", "/public/ap2.jpg"],
  //     description: "A private beachfront venue with stunning ocean views.",
  //     about: "Exclusive venue with private beach access.",
  //     howToReach: "20 mins from Miami Airport.",
  //     venueExpertNotes: "Perfect for beach weddings and sunset ceremonies.",
  //     featuresOfVenue: "Private beach, ocean view, water sports.",
  //     venuePolicies: "Alcohol and music allowed.",
  //     summary: "An exclusive beach venue for intimate events.",
  //     review: [],
  //     foodPackages: "Veg: $80, Non-Veg: $100",
  //     rank: 10,
  //     isVerified: "Approved",
  //     venueType: ["Beachside Venues"],
  //     facilities: ["Private beach", "Water sports", "Live music", "In-house decor"],
  //   },
  //   {
  //     yourName: "Alex Green",
  //     businessName: "Garden Bliss",
  //     email: "gardenbliss@example.com",
  //     password: "gardenPass567",
  //     phone: "333-555-6666",
  //     address: "15 Blossom Lane",
  //     city: "San Francisco",
  //     state: "CA",
  //     comment: "A garden venue surrounded by lush greenery.",
  //     guestCapacity: "150-250",
  //     images: ["/public/ap1.jpg", "/public/ap2.jpg"],
  //     description: "A beautiful garden venue with a serene atmosphere.",
  //     about: "Great for outdoor ceremonies and receptions.",
  //     howToReach: "15 mins from downtown.",
  //     venueExpertNotes: "Perfect for nature lovers and outdoor events.",
  //     featuresOfVenue: "Lush gardens, outdoor seating, custom decor.",
  //     venuePolicies: "Outside catering allowed.",
  //     summary: "A serene garden venue for intimate weddings.",
  //     review: [],
  //     foodPackages: "Veg: $75, Non-Veg: $95",
  //     rank: 9,
  //     isVerified: "Approved",
  //     venueType: ["Garden Venues"],
  //     facilities: ["Catering services", "Live music", "DJ services", "Ample parking"],
  //   },
  //   {
  //     yourName: "John Doe",
  //     businessName: "The Grand Hall",
  //     email: "grandhall@example.com",
  //     password: "password123",
  //     phone: "123-456-7890",
  //     address: "123 Main St, Downtown",
  //     city: "New York",
  //     state: "NY",
  //     comment: "A beautiful venue for weddings.",
  //     guestCapacity: "500-700",
  //     images: ["/public/ap1.jpg", "/public/ap2.jpg"],
  //     description: "A spacious hall with stunning interiors and great ambiance.",
  //     about: "Located in the heart of the city, perfect for large events.",
  //     howToReach: "Accessible via subway and buses.",
  //     venueExpertNotes: "Great for large-scale events and corporate functions.",
  //     featuresOfVenue: "Spacious hall, modern lighting, and sound system.",
  //     venuePolicies: "Outside food not allowed, valet parking available.",
  //     summary: "Top-rated venue in the city with excellent facilities.",
  //     review: [],
  //     foodPackages: "Veg: $50, Non-Veg: $70",
  //     rank: 9,
  //     isVerified: "Approved",
  //     venueType: ["Banquet Halls", "Wedding Lawns"],
  //     facilities: ["Food provided by venue", "Valet parking", "Air conditioning", "DJ services"],
  //   },
  //   {
  //     yourName: "Emily Smith",
  //     businessName: "Riverside Pavilion",
  //     email: "riverside@example.com",
  //     password: "securePass456",
  //     phone: "987-654-3210",
  //     address: "45 River Road, Uptown",
  //     city: "Los Angeles",
  //     state: "CA",
  //     comment: "Perfect for outdoor weddings with river views.",
  //     guestCapacity: "300-500",
  //     images: ["/public/ap1.jpg", "/public/ap2.jpg"],
  //     description: "An outdoor venue with picturesque river views.",
  //     about: "A beautiful riverside venue for intimate ceremonies.",
  //     howToReach: "20 mins from downtown, accessible by car.",
  //     venueExpertNotes: "Ideal for sunset weddings and photoshoots.",
  //     featuresOfVenue: "Scenic views, outdoor seating, customizable decor.",
  //     venuePolicies: "Music allowed until midnight.",
  //     summary: "A tranquil venue with stunning river views.",
  //     review: [],
  //     foodPackages: "Veg: $60, Non-Veg: $80",
  //     rank: 8,
  //     isVerified: "Approved",
  //     venueType: ["Beachside Venues", "Garden Venues"],
  //     facilities: ["Outside food allowed", "Live music", "Open bar", "Sea view"],
  //   },
  //   {
  //     yourName: "Michael Johnson",
  //     businessName: "Skyline Rooftop",
  //     email: "skyline@example.com",
  //     password: "roofTop789",
  //     phone: "555-123-4567",
  //     address: "789 High Street",
  //     city: "Chicago",
  //     state: "IL",
  //     comment: "A rooftop venue with panoramic city views.",
  //     guestCapacity: "200-300",
  //     images: ["/public/ap1.jpg", "/public/ap2.jpg"],
  //     description: "An elegant rooftop venue with a breathtaking view of the skyline.",
  //     about: "Perfect for evening events and cocktail parties.",
  //     howToReach: "Located in the city center, easy access by metro.",
  //     venueExpertNotes: "Great for evening events with stunning night views.",
  //     featuresOfVenue: "City view, modern decor, bar services.",
  //     venuePolicies: "Alcohol allowed with restrictions.",
  //     summary: "Popular for corporate events and evening parties.",
  //     review: [],
  //     foodPackages: "Veg: $70, Non-Veg: $90",
  //     rank: 7,
  //     isVerified: "Approved",
  //     venueType: ["Rooftop Venues"],
  //     facilities: ["AV equipment", "Free WiFi", "In-house decor", "DJ services"],
  //   },
  //   {
  //     yourName: "Sarah Lee",
  //     businessName: "Oceanfront Retreat",
  //     email: "oceanfront@example.com",
  //     password: "ocean1234",
  //     phone: "444-321-9876",
  //     address: "21 Beach Road",
  //     city: "Miami",
  //     state: "FL",
  //     comment: "Private beach venue perfect for seaside weddings.",
  //     guestCapacity: "100-200",
  //     images: ["/public/ap1.jpg", "/public/ap2.jpg"],
  //     description: "A private beachfront venue with stunning ocean views.",
  //     about: "Exclusive venue with private beach access.",
  //     howToReach: "20 mins from Miami Airport.",
  //     venueExpertNotes: "Perfect for beach weddings and sunset ceremonies.",
  //     featuresOfVenue: "Private beach, ocean view, water sports.",
  //     venuePolicies: "Alcohol and music allowed.",
  //     summary: "An exclusive beach venue for intimate events.",
  //     review: [],
  //     foodPackages: "Veg: $80, Non-Veg: $100",
  //     rank: 10,
  //     isVerified: "Approved",
  //     venueType: ["Beachside Venues"],
  //     facilities: ["Private beach", "Water sports", "Live music", "In-house decor"],
  //   },
  //   {
  //     yourName: "Alex Green",
  //     businessName: "Garden Bliss",
  //     email: "gardenbliss@example.com",
  //     password: "gardenPass567",
  //     phone: "333-555-6666",
  //     address: "15 Blossom Lane",
  //     city: "San Francisco",
  //     state: "CA",
  //     comment: "A garden venue surrounded by lush greenery.",
  //     guestCapacity: "150-250",
  //     images: ["/public/ap1.jpg", "/public/ap2.jpg"],
  //     description: "A beautiful garden venue with a serene atmosphere.",
  //     about: "Great for outdoor ceremonies and receptions.",
  //     howToReach: "15 mins from downtown.",
  //     venueExpertNotes: "Perfect for nature lovers and outdoor events.",
  //     featuresOfVenue: "Lush gardens, outdoor seating, custom decor.",
  //     venuePolicies: "Outside catering allowed.",
  //     summary: "A serene garden venue for intimate weddings.",
  //     review: [],
  //     foodPackages: "Veg: $75, Non-Veg: $95",
  //     rank: 9,
  //     isVerified: "Approved",
  //     venueType: ["Garden Venues"],
  //     facilities: ["Catering services", "Live music", "DJ services", "Ample parking"],
  //   },
  // ];
  

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
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allowedVenues.length > 0 ? (
            allowedVenues.map((venue, index) => (
              <VenueCardMain
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