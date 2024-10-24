import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: "ABDUL KAREEM",
      role: "Founder & CEO",
      imageUrl: "/founderandCEO.jpg",
    },
    // {
    //   name: 'Raziya Kareem',
    //   role: 'Senior Event Consultant',
    //   imageUrl: '/SeniorEventConsultant.jpg',
    // },
    // {
    //   name: 'Azra Akram ali khan',
    //   role: 'Senior Event Director',
    //   imageUrl: '/SeniorEventDirector.jpg',
    // },
  ];

  const localVideos = [
    "/aboutus1.mp4", // Update these paths to your actual video file paths
    "/aboutus2.mp4",
    "/aboutus3.mp4",
  ];

  return (
    <div className="w-100">
      <NavBar />
      <div className="bg-grey-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section id="title">
            <div
              id="banner"
              className="lg:text-center bg-[url('/aboutusbanner.jpg')] h-64 flex place-items-center place-content-center bg-cover"
            >
              <h2 className="text-5xl font-marcellus font-semibold text-pink-950">
                About Us
              </h2>
            </div>
            <div id="title">
              <p className="font-roboto mt-24 text-center text-sm text-black uppercase">
                Welcome to Wedding Venuez
              </p>
              <p className="font-marcellus mt-4 text-center text-4xl text-black font-bold">
                Dedicated to helping you create the wedding of your dreams
              </p>
              <p className="font-roboto mt-4 text-center text-lg text-black">
                Connecting you with the best venues and vendors in the industry
              </p>
            </div>
          </section>

          <section id="info">
            <div className="mt-24 flex flex-col items-center">
              <div className="flex w-full">
                {/*first column*/}
                <div className="flex flex-col w-1/3 border border-white-500 border-3">
                  <div className="flex-1 flex-col bg-majenta p-4 flex justify-center">
                    <div>
                      <h2 className="text-white-500 font-marcellus text-3xl font-bold tracking-wider">
                        Our Mission
                      </h2>
                    </div>
                    <div className="mt-4">
                      <p className="text-white-500 text-md font-roboto">
                        Our mission is to create unforgettable weddings by
                        pairing couples with top vendors. We ensure every love
                        story is beautifully celebrated through personalized
                        service and attention to detail.
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 h-1/2 overflow-hidden">
                    <img
                      src="/aboutusLeft.jpg"
                      alt="Placeholder"
                      className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                    />
                  </div>
                </div>

                {/* Second Column*/}
                <div className="w-1/3 border border-white-500 border-3 ">
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src="aboutusMiddle.png"
                      alt="Placeholder"
                      className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                    />
                  </div>
                </div>

                {/* Third Column */}
                <div className="flex flex-col w-1/3 border border-white-500 border-3">
                  <div className="flex-1 flex-col bg-majenta p-4 flex justify-center">
                    <div>
                      <h2 className="text-white-500 font-marcellus text-3xl font-bold tracking-wider">
                        Our Story
                      </h2>
                    </div>
                    <div className="mt-4">
                      <p className="text-white-500 text-md font-roboto">
                        Founded in 2015 by Abdul Kareem, we’ve grown from a
                        small startup into a trusted leader in wedding vendor
                        services. With a dedicated team and top-tier vendors, we
                        bring couples' dream weddings to life through excellence
                        and personalized service.
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 h-1/2 overflow-hidden">
                    <img
                      src="/aboutusRight.jpg"
                      alt="Placeholder"
                      className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-pink-50 mt-12 py-20">
        <div>
          <section className="founders-note bg-gradient-to-b from-pink-50 to-white py-12">
            <div className="w-11/12 sm:w-3/5 md:w-2/5 mx-auto text-center py-6 rounded-3xl shadow-lg transition-transform transform hover:scale-105">
              {/* Title: Founder's Note */}
              <h2 className="font-marcellus text-4xl md:text-5xl font-bold text-pink-950 mb-4">
                Founder's Note
              </h2>

              {/* Founder name and title */}
              <div className="text-xl font-medium font-inter mb-6 text-pink-800">
                <p>ABDUL KAREEM - Founder & CEO</p>
              </div>

              {/* Circular founder's photo */}
              <div className="mb-8">
                <img
                  src="/founderandCEO.jpg"
                  alt="Founder Abdul Kareem"
                  className="w-40 h-40 sm:w-64 sm:h-64 rounded-full mx-auto object-cover border-4 border-pink-500 shadow-md transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Founder's description */}
              <div className="text-gray-700">
                <p className="mb-2 px-4 text-center text-lg font-roboto">
                  Abdul Kareem is a visionary leader dedicated to making every
                  wedding unique. He believes that every couple deserves a
                  wedding that reflects their unique love story, and we are
                  committed to making that vision a reality through exceptional
                  service and attention to detail.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-grey-100 py-16">
        <div className="mt-8">
          <section id="videos">
            <div>
              <h2 className="font-marcellus text-4xl font-semibold text-gray-900 text-center mb-8">
                Media
              </h2>
            </div>

            <div className="container mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {localVideos.map((videoPath, index) => (
                  <div
                    key={index}
                    className="rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                  >
                    <video className="w-full h-80 object-cover" controls>
                      <source src={videoPath} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
