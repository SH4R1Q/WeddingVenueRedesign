// import React, { useState } from 'react';
// import { VenueRegistrationForm, VendorRegistrationForm } from './businessRegistration';


// const Business: React.FC = () => {
//   const [showVendorForm, setShowVendorForm] = useState(true);

//   const handleToggleForm = () => {
//     setShowVendorForm(prevState => !prevState);
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded shadow-md">
//       <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Business Registration</h2>
//       <div className="flex justify-center mb-4 sm:mb-6">
//         <button
//           className={`py-1 px-2 sm:py-2 sm:px-4 rounded-md ${showVendorForm ? 'bg-[#173445] text-white' : 'bg-gray-300 text-gray-700'}`}
//           onClick={handleToggleForm}
//         >
//           Vendor Registration
//         </button>
//         <button
//           className={`ml-2 sm:ml-4 py-1 px-2 sm:py-2 sm:px-4 rounded-md ${!showVendorForm ? 'bg-[#173445] text-white' : 'bg-gray-300 text-gray-700'}`}
//           onClick={handleToggleForm}
//         >
//           Venue Registration
//         </button>
//       </div>
//       <div className="p-4 sm:p-6 bg-gray-100 rounded-md">
//         {showVendorForm ? <VendorRegistrationForm /> : <VenueRegistrationForm />}
//       </div>
//     </div>
//   );
// };

// export default Business;


import React, { useState } from 'react';
import { VenueRegistrationForm, VendorRegistrationForm } from './businessRegistration';
import { useNavigate } from 'react-router-dom';

const Business: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'vendor' | 'venue'>('vendor');
  const navigate = useNavigate();

  const handleFormSwitch = (form: 'vendor' | 'venue') => {
    setActiveForm(form);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 p-8">
      
      {/* Header with Back Button */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-10">
        <button
          onClick={() => navigate(-1)}
          className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-4xl font-bold text-gray-800">Business Registration</h2>
      </div>

      {/* Tab Buttons */}
      <div className="w-full max-w-5xl flex justify-center gap-6 mb-8">
        <button
          className={`px-6 py-3 text-xl font-semibold rounded-t-lg ${
            activeForm === 'vendor'
              ? 'bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
          onClick={() => handleFormSwitch('vendor')}
        >
          Vendor Registration
        </button>
        <button
          className={`px-6 py-3 text-xl font-semibold rounded-t-lg ${
            activeForm === 'venue'
              ? 'bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
          onClick={() => handleFormSwitch('venue')}
        >
          Venue Registration
        </button>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-5xl bg-gradient-to-r from-blue-50 to-blue-100 p-10 rounded-b-lg shadow-lg">
        {activeForm === 'vendor' ? <VendorRegistrationForm /> : <VenueRegistrationForm />}
      </div>
    </div>
  );
};

export default Business;
