import { FaPhoneAlt } from 'react-icons/fa'; // Import phone icon from react-icons

const   InformationBanner = () => {
  return (
    <div className="bg-gradient-to-r from-red-900 via-red-700 to-red-500 text-white py-8 px-10 mt-8 shadow-lg md:flex"> {/* Left to right gradient from #A31F24 to #B54B4F */}
      <div className='  '>
      <div className="items-center  text-3xl font-semibold mb-6 flex">
        <FaPhoneAlt className="w-8 h-8 mr-2" />
        CALL US: <span className="text-white ml-2">+91 8076207112</span> {/* Updated phone number text color to white */}
      </div>
      <div className="text-base mb-4 italic">24-hour helpline</div>
      <div className="text-xl mb-4 font-bold">OR</div>
      <div className="text-lg mb-4">HAVE US CALL YOU FOR UP TO <span className="font-bold text-white">30%</span> DISCOUNT</div> {/* Updated "30%" text color to black */}
      <div className="text-lg mb-4 font-bold">India's Largest Wedding Company.</div>
      <div className="text-lg mb-4">Find, Compare And Book Wedding Venues And Services.</div>
      <div className="text-lg mb-4 font-bold">Best Prices Guaranteed.</div>
      <div className="text-lg">Find Inspiration, Ideas And Insights For Your Wedding.</div>
    </div>
    <div className='md:absolute md:bottom-[42vh]  lg:ml-[96vh] lg:bottom-[42vh]'>
      <img  className='h-fit w-fit ' src='/Group3.png'   />
    </div>
    </div>
  );
};

export default InformationBanner;


// import { FaPhoneAlt } from 'react-icons/fa'; // Import phone icon from react-icons

// const InformationBanner = () => {
//   return (
//     <div className="w-full bg-gradient-to-r from-red-900 via-red-700 to-red-500 text-white py-8 px-10 mt-8 shadow-lg md:flex justify-between"> {/* Left to right gradient from #A31F24 to #B54B4F */}
//       <div className=' absolute  '>
//       <div className="items-center  text-3xl font-semibold mb-6">
//         <FaPhoneAlt className="w-8 h-8 mr-2" />
//         CALL US: <span className="text-white ml-2">+912249449790</span> {/* Updated phone number text color to white */}
//       </div>
//       <div className="text-base mb-4 italic">24-hour helpline</div>
//       <div className="text-xl mb-4 font-bold">OR</div>
//       <div className="text-lg mb-4">HAVE US CALL YOU FOR UP TO <span className="font-bold text-white">30%</span> DISCOUNT</div> {/* Updated "30%" text color to black */}
//       <div className="text-lg mb-4 font-bold">India's Largest Wedding Company.</div>
//       <div className="text-lg mb-4">Find, Compare And Book Wedding Venues And Services.</div>
//       <div className="text-lg mb-4 font-bold">Best Prices Guaranteed.</div>
//       <div className="text-lg">Find Inspiration, Ideas And Insights For Your Wedding.</div>
//     </div>
//     <div className='absolute'>
//       <img  className='h-fit w-fit ' src='/public/group3.png'   />
//     </div>
//     </div>
//   );
// };

// export default InformationBanner;
