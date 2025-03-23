import React, { useState } from 'react';

interface VenueImageGalleryProps {
  images?: string[];
}

const VenueImageGallery: React.FC<VenueImageGalleryProps> = ({ images }) => {
  const [showAll, setShowAll] = useState(false);
  
  const initialImagesToShow = 4; // Number of images to show initially

  const handleViewMoreClick = () => {
    setShowAll(!showAll); // Toggle between showing all images and initial images
  };

  const imagesToDisplay = showAll ? images : images?.slice(0, initialImagesToShow);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {imagesToDisplay && imagesToDisplay.length > 0 ? (
          imagesToDisplay.map((image, index) => (
            <div key={index} className="w-full h-64 relative overflow-hidden rounded-lg shadow-lg">
              <a href={image} target="_blank" rel="noopener noreferrer">
                <img
                  src={image}
                  alt={`Venue image ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-300 ease-in-out transform hover:scale-105"
                />
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No images available</p>
        )}
      </div>

      {/* View More Button */}
      {images && images.length > initialImagesToShow && (
        <div className="text-center my-4">
          <button
            onClick={handleViewMoreClick}
            className="text-indigo-600 hover:text-indigo-800 font-semibold focus:outline-none"
          >
            {!showAll ? "View More" : "View Less"}
          </button>
        </div>
      )}
    </div>
  );
};

export default VenueImageGallery;



