import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/navbar';
import { RealWeddings } from '../types/types';
import { useGetAllRealWeddingsQuery } from '../redux/api/realWeddings';
import SkeletonWeddingCard from '../components/skeleton/RealWedding';

const RealWeddingsList: React.FC = () => {
  const { data: realWeddingsData, isLoading, error } = useGetAllRealWeddingsQuery();
  const realWeddings: RealWeddings[] = realWeddingsData?.data.realWeddings || [];

  if (error) {
    return <h1>Error while loading data</h1>;
  }

  return (
    <>
      <NavBar />
      {/* Hero Section */}
      <section className="relative w-full h-[400px] bg-cover bg-center" style={{ backgroundImage: `url('/ap2.jpg')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-5">
          <h1 className="text-5xl font-playfair font-bold text-white mb-4">Discover Real Wedding Stories</h1>
          <p className="text-lg text-white mb-6">
            Explore beautiful moments, inspiring locations, and unforgettable celebrations curated just for you.
          </p>
        </div>
      </section>

      <div className="pb-12 px-12 bg-white">
        {isLoading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonWeddingCard key={index} />
            ))}
          </div>
        ) : realWeddings.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-12">
            {realWeddings.slice(0, 6).map((wedding: RealWeddings) => {
              const imageUrl =
                wedding.images && wedding.images.length > 0
                  ? wedding.images[0]
                  : "/default-image.jpg";
              const contentPreview = wedding.content
                ? wedding.content.substring(0, 80)
                : "Details coming soon!";
              const eventDate = wedding.eventDate
                ? new Date(wedding.eventDate).toLocaleDateString()
                : "Date not available";

              return (
                <div
                  key={wedding._id}
                  className="bg-white border border-pink-100 shadow-md rounded-sm overflow-hidden relative group"
                >
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt={wedding.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-3">
                      <h2 className="text-lg font-bold text-white">{wedding.title}</h2>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-gray-700 mb-1">{contentPreview}...</p>
                    <p className="text-xs text-gray-500 mb-1">
                      <span className="font-semibold">Event Date:</span> {eventDate}
                    </p>
                    <Link
                      to={`/realWedding/${wedding._id}`}
                      className="text-pink-600 hover:underline text-sm font-semibold"
                    >
                      Discover More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-700">
            Currently no weddings available. Stay tuned for updates!
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RealWeddingsList;
