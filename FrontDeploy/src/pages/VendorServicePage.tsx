
import NavBar from "../components/navbar";
import Footer from "../components/Footer";
import PriceCard from "../components/PriceCard";
import VendorInfo from "../components/VendorInfo";
import TermsAndPolicyCard from "../components/Terms";
import RelatedArticles from "../components/RelatedArticles";
import { useParams } from "react-router-dom";
import { useGetVendorByIdQuery } from "../redux/api/vendor";
import VenueImageGallery from "../components/VenueImageGallery";
import FAQSection from "../components/FaqSection";

interface Params {
  [key: string]: string | undefined;
}

const dummyData =
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
};

function VendorServicePage() {
  const { _id } = useParams<Params>();
  const id = _id;

  const {
    data: vendor,
    error,
    isLoading,
  } = useGetVendorByIdQuery(id ? id : "");

  // const vendorData = vendor?.data.vendor;
  const vendorData = dummyData;
  console.log("vendor:", vendor);

  if (!id) {
    return <div>No ID provided.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if ("message" in error) {
      // Handle SerializedError
      return <div>Error: {error.message}</div>;
    }
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-28 mt-8">
        {/* Hero Section */}
        {vendorData?.portfolio?.[0] && (
          <div className="w-full">
            <img
              src={vendorData?.portfolio[0]}
              alt={`${vendorData.businessName} main`}
              className="w-full object-cover h-[400px] sm:h-[500px] lg:h-[600px]"
            />
            {/* <Carousel images = {venueData.images}/> */}
          </div>
        )}

        {/* content Section  */}
        <div className="container -mt-16 mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 px-4">
          {/* left section  */}
          <div className="w-full lg:w-3/4 space-y-4">
            <div className="bg-white shadow">
              <VendorInfo
                name={vendorData?.name}
                location={vendorData?.city}
                reviews={vendorData.review.length}
                address={vendorData?.address}
                photosCount={vendorData?.portfolio?.length}
                shareMessage={`Check out ${vendorData?.businessName} in ${vendorData?.city} – a perfect ${vendorData?.type_Of_Business} for weddings and celebrations with great Services. See more details and photos here: https://www.wedmegood.com/"`}
                summary={`${vendorData?.summary} | ${vendorData?.usp} | ${vendorData?.termAndConditions} | ${vendorData?.cancellationPolicy}`}
                businessType={vendorData?.type_Of_Business}
              />
            </div>
          </div>
          {/* right section  */}
          <div className="w-full lg:w-1/4 space-y-4 lg:sticky lg:top-20">
            {/* Price Card */}
            <div className="bg-white shadow">
              <PriceCard
                name={vendorData?.businessName}
                price={vendorData?.packages.price}
                contactNumber={vendorData?.phone}
                email={vendorData?.email}
                detailPackage={vendorData?.packages}
              />
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="container mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 px-4">
          {/* Left Section */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow p-2 mt-4">
              <VenueImageGallery images={vendorData?.portfolio} />
            </div>
          </div>
        </div>
        <div className="my-4">
          <TermsAndPolicyCard />
        </div>
        <div className="container mx-auto px-4 mt-4">
          <RelatedArticles />
        </div>
      </div>
      {/* FAQ Section */}
      <div className="container mx-auto px-4 mt-8">
        <FAQSection />
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default VendorServicePage;
