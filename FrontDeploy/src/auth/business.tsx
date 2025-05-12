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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-[#1e1e1e] to-gray-800 text-white p-8">
      
      {/* Header with Back Button */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-10">
        <button
          onClick={() => navigate(-1)}
          className="text-lg font-medium bg-[#1e1e1e] hover:bg-black bg-opacity-90 text-white transition-colors"
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
              ? 'bg-[#1e1e1e] text-white'
              : 'bg-[#1e1e1e] hover:bg-black bg-opacity-90 text-white'
          }`}
          onClick={() => handleFormSwitch('vendor')}
        >
          Vendor Registration
        </button>
        <button
          className={`px-6 py-3 text-xl font-semibold rounded-t-lg ${
            activeForm === 'venue'
              ? 'bg-[#1e1e1e] text-white'
              : 'bg-[#1e1e1e] hover:bg-black bg-opacity-90 text-white'
          }`}
          onClick={() => handleFormSwitch('venue')}
        >
          Venue Registration
        </button>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-5xl bg-gradient-to-r from-[#1e1e1e] to-gray-800 text-white p-10 rounded-b-lg shadow-lg">
        {activeForm === 'vendor' ? <VendorRegistrationForm /> : <VenueRegistrationForm />}
      </div>
    </div>
  );
};

export default Business;
