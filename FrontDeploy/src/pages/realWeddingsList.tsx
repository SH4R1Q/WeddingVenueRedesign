// src/pages/RealWeddingsList.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/navbar';

import { RealWeddings } from '../types/types';
import { useGetAllRealWeddingsQuery } from '../redux/api/realWeddings';
import SkeletonWeddingCard from '../components/skeleton/RealWedding';

const RealWeddingsList: React.FC = () => {
  const { data: realWeddingsData, isLoading , error } = useGetAllRealWeddingsQuery();
  console.log("real data",realWeddingsData);
  const realWeddings: RealWeddings[] = realWeddingsData?.data.realWeddings || [];

  if (error) {
    return <h1>Error while loading data</h1>;
  }

  return (
    <>
      <NavBar />
      <div className="pb-12 px-12 bg-pink-50">
        <h2 className="text-3xl text-gray-900 font-bold font-marcellus text-center mb-12">
          Real Wedding Highlights
        </h2>
        {isLoading ? (
          <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonWeddingCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            {'Error while loading data'}
          </div>
        ) : realWeddings.length > 0 ? (
          <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {realWeddings.slice(0, 4).map((wedding: RealWeddings) => {
              const imageUrl =
                wedding.images && wedding.images.length > 0
                  ? wedding.images[0]
                  : "/default-image.jpg";
              const contentPreview = wedding.content
                ? wedding.content.substring(0, 190)
                : "Details coming soon!";
              return (
                <div
                  key={wedding._id}
                  className="bg-white border border-2 !border-pink-100 shadow-xl overflow-hidden relative group"
                >
                  <img
                    src={imageUrl}
                    alt={wedding.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end justify-center p-5">
                    <h2 className="text-xl font-bold font-marcellus text-white group-hover:opacity-0">
                      {wedding.title}
                    </h2>
                  </div>
                  {/* <div className="absolute bottom-0 w-full p-5 bg-white bg-opacity-90 transform 
                            transition-transform duration-300 group-hover:-translate-y-2/3"
            > */}
                  .
                  <div
                    className="absolute inset-0 p-5 bg-white-500-a transform 
                transition-all duration-300 translate-y-full group-hover:translate-y-0 flex flex-col justify-start"
                  >
                    <h2 className="text-xl font-bold font-marcellus text-gray-800 mb-4">
                      {wedding.title}
                    </h2>
                    <p className="text-lg font-semibold text-gray-700 mt-2">
                      {contentPreview}...
                    </p>
                    <Link
                      to={`/realWedding/${wedding._id}`}
                      className="text-pink-600 hover:underline mt-3 inline-block"
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
