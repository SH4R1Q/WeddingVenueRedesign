import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";

const aboutImage = "/wv_cover2.jpg";

const images = [
  "/public/home1.jpg",
  "/public/home2.jpg",
  "/public/home3.jpg",
  "/public/home4.jpg",
];

const NewHome: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
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

      <section id="aboutUs" className="py-16 bg-gray-50">
        <h2 className="text-5xl font-marcellus text-gray-800 mb-6 font-semibold text-center">
          About Us
        </h2>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 text-left mb-8 md:mb-0 flex flex-col items-start">
            <p className="text-lg text-gray-600 mb-4">
              Welcome to India’s largest wedding planning platform! We connect
              you with top vendors to make your wedding planning enjoyable and
              seamless. With thousands of trusted reviews, you can choose the
              perfect vendors to match your vision. Join us to create an
              unforgettable celebration that reflects your unique love story!
            </p>
            <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold transition duration-300 hover:bg-yellow-500">
              Contact Us
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center items-start relative">
            {/* First Image */}
            <img
              src={aboutImage}
              alt="Wedding Planning"
              className="w-64 h-64 rounded-lg shadow-lg object-cover z-10"
            />
            {/* Second Image (Overlap) */}
            <img
              src={aboutImage} // Use a different image URL for the second image if needed
              alt="Wedding Planning Overlay"
              className="w-48 h-48 rounded-lg shadow-lg object-cover absolute top-16 left-16 z-0" // Adjust the position as needed
            />
          </div>
        </div>
      </section>

      <section></section>
    </div>
  );
};

export default NewHome;
