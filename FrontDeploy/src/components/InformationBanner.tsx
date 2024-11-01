// import { Phone } from 'lucide-react'; // Import phone icon from react-icons

// const InformationBanner = () => {
//   return (
//     <div className="bg-gradient-to-r from-red-900 via-red-700 to-red-500 text-white py-12 px-6 md:px-10 shadow-lg">
//       <div className="space-y-6 max-w-2xl">
//         <div className="flex items-center text-3xl font-bold animate-pulse">
//           <Phone className="w-8 h-8 mr-3" strokeWidth={2.5} />
//           <span className="text-center sm:text-left">CALL US: <span className="text-yellow-300 block sm:inline mt-1 sm:mt-0 sm:ml-2">+91 8076207112</span></span>
//         </div>
//         <div className="md:text-left sm:text-right text-lg italic opacity-80">24-hour helpline</div>
//         <div className="text-2xl font-bold lg:text-left sm:text-center">OR</div>
//         <div className="lg:text-left text-xl font-semibold sm:text-center animate-pulse">
//           HAVE US CALL YOU FOR UP TO <span className="text-yellow-300 text-2xl">30%</span> DISCOUNT
//         </div>
//         <div className="space-y-3">
//           <p className="lg:text-left text-xl font-bold sm:text-center">India's Largest Wedding Company</p>
//           <p className="lg:text-lg lg:text-left sm:text-center">Find, Compare And Book Wedding Venues And Services</p>
//           <p className="lg:text-left text-xl font-bold sm:text-center">Best Prices Guaranteed</p>
//           <p className="lg:text-left text-lg sm:text-center">Find Inspiration, Ideas And Insights For Your Wedding</p>
//         </div>
//         <div className='md:absolute md:bottom-[42vh] lg:ml-[96vh] lg:bottom-[42vh]'>
//           <img className='h-fit w-fit' src='/Group3.png' alt="Decorative element" />
//         </div>
//       </div>
//     </div>
//   );
// };


// export default InformationBanner;


import { Parallax } from 'react-parallax';
import { Phone } from 'lucide-react';

const InformationBanner = () => (
  <Parallax
    bgImage="/InfoBanner.jpg" // background image
    strength={400}// parallax strength 
  >
    <div className="bg-[#0000009e] text-white py-16 px-8 md:px-12 shadow-lg flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0 max-w-full mx-auto min-h-[60vh] items-center">
      {/* Left Side */}
      <div className="flex-1 space-y-6 border-r border-gray-500 pr-6 md:pr-10">
        {/* Contact Information */}
        <div className="flex items-center text-lg font-semibold space-x-3">
          <Phone className="w-6 h-6 text-yellow-300" strokeWidth={2.5} />
          <span className="text-left">
            <span className="uppercase text-sm text-gray-300 tracking-wide">Call Us:</span>
            <a href="tel:+918076207112" className="text-yellow-300 text-2xl ml-2 font-bold">
              +91 8076207112
            </a>
          </span>
        </div>
        {/* Helpline Note */}
        <div className="text-left text-sm italic opacity-80 text-gray-400">24-hour helpline</div>
        {/* Divider Text */}
        <div className="text-lg font-semibold text-left text-gray-300">or</div>
        {/* Call Back Offer */}
        <div className="text-left text-lg font-semibold">
          <span className="animate-pulse">Have us call you for up to </span>
          <span className="text-yellow-300 text-2xl font-bold">30%</span> discount
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 space-y-4 pl-6 md:pl-10">
        <p className="text-2xl font-semibold text-left text-gray-100">India's Largest Wedding Company</p>
        <p className="text-base text-left text-gray-300">Find, Compare, and Book Wedding Venues and Services</p>
        <p className="text-2xl font-semibold text-left text-gray-100">Best Prices Guaranteed</p>
        <p className="text-base text-left text-gray-300">Find Inspiration, Ideas, and Insights for Your Wedding</p>
      </div>
    </div>
  </Parallax>
);

export default InformationBanner;
