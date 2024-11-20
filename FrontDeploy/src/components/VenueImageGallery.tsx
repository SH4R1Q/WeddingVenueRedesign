// import React from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

// interface VenueImageCarouselProps {
//   images?: string[];
// }

// const responsive = {
//   superLargeDesktop: {
//     breakpoint: { max: 4000, min: 1024 },
//     items: 4,
//   },
//   desktop: {
//     breakpoint: { max: 1024, min: 768 },
//     items: 3,
//   },
//   tablet: {
//     breakpoint: { max: 768, min: 464 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
// };

// const VenueImageCarousel: React.FC<VenueImageCarouselProps> = ({ images }) => {
//   return (
//     <div className="w-full h-64">
//       {images && images.length > 0 && (
//         <Carousel
//           responsive={responsive}
//           infinite
//           autoPlay
//           autoPlaySpeed={3000}
//           keyBoardControl
//           showDots
//           containerClass="carousel-container"
//           itemClass="carousel-item-padding-40-px"
//         >
//           {images.map((image, index) => (
//             <div key={index} className="h-64 flex justify-center items-center">
//               <img src={image} alt={`Venue image ${index + 1}`} className="h-full object-cover" />
//             </div>
//           ))}
//         </Carousel>
//       )}
//     </div>
//   );
// };

// export default VenueImageCarousel;

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



