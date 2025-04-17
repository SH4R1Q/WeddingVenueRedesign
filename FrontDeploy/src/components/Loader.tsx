// import React, { useState, useEffect } from "react";

// const Loader: React.FC = () => {
//   const [percentage, setPercentage] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPercentage((prev) => {
//         if (prev < 100) {
//           return prev + 1;
//         } if(prev === 100) {
//           return 0;
//         } else {
//           clearInterval(interval);
//           return 100;
//         }
//       });
//     }, 10); // Adjust the speed here (50ms for each increment)

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="flex rounded-lg text-center justify-center">
//           <img className="w-50 h-50 object-contain" src="/weddingz_venue_logo_transparent.gif" alt="" />
//           {/* <div className="text-2xl font-semibold mb-4">{percentage}%</div> */}
//       </div>
//     </div>
//   );
// };

// export default Loader;

import React, { useState, useEffect } from "react";

const Loader: React.FC = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        if (prev === 100) {
          return 0;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center rounded-lg text-center justify-center">
        <img
          className="w-50 h-50 object-contain"
          src="/weddingz_venue_logo_transparent.gif"
          alt=""
        />
        <div className="text-white text-2xl font-semibold mt-4">
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default Loader;