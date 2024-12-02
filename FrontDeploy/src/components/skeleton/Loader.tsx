import React, { useState, useEffect } from "react";

const Loader: React.FC = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 100) {
          return prev + 1;
        } if(prev === 100) {
          return 0;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 10); // Adjust the speed here (50ms for each increment)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl text-center">
        <div className="text-2xl font-semibold mb-4">{percentage}%</div>
        <div className="w-16 h-16 relative">
          <div
            className="absolute inset-0 rounded-full border-4 border-blue-600"
            style={{
              clipPath: `inset(${100 - percentage}% 0 0 0)`,
              animation: "none",
            }}
          />
          <div className="w-16 h-16 border-4 rounded-full border-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
