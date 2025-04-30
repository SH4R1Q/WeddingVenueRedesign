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
