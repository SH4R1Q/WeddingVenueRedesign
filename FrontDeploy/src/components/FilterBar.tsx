import React, { useState } from 'react';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [minGuests, setMinGuests] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [foodPackage, setFoodPackage] = useState('');
  const [facilities, setFacilities] = useState('');
  const [venueTypes, setVenueTypes] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters = {
      businessName: businessName || undefined,
      city: city || undefined,
      minGuests: minGuests || undefined,
      maxGuests: maxGuests || undefined,
      foodPackage: foodPackage || undefined,
      facilities: facilities || undefined,
      venueTypes: venueTypes || undefined,
    };
    onFilterChange(filters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="rounded-full border-2 border-solid border-[#92396a] fixed top-15 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-300 
                      h-10 bg-[#ffffff87] shadow-lg2 flex items-center justify-between px-4 hover:!bg-[#bd87a5]">
        <button
          className="text-pink-600 text-semibold font-roboto focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ?"Close" : "Open Filters"}
        </button>
      </div>
      {isOpen && (
        <form
          onSubmit={handleFilterSubmit}
          className="fixed top-15 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-300 bg-[#ffffffbf] bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl
                      w-3/5 mx-auto mt-12 flex flex-wrap items-center justify-center gap-4 border-2 border-solid border-[#92396a] p-4"

        >
          <input
            className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
            type="text"
            placeholder="Venue Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <input
            className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
            type="number"
            placeholder="Min Guests"
            value={minGuests}
            onChange={(e) => setMinGuests(e.target.value)}
          />
          <input
            className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
            type="number"
            placeholder="Max Guests"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
          />
          <input
            className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
            type="text"
            placeholder="Food Package"
            value={foodPackage}
            onChange={(e) => setFoodPackage(e.target.value)}
          />
          <input
            className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
            type="text"
            placeholder="Facilities"
            value={facilities}
            onChange={(e) => setFacilities(e.target.value)}
          />
          <input
            className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
            type="text"
            placeholder="Venue Types"
            value={venueTypes}
            onChange={(e) => setVenueTypes(e.target.value)}
          />
          <div>
            <button
              className="bg-indigo-500 text-white font-medium text-sm py-1 px-5 rounded-full hover:bg-indigo-600 transition duration-200 ease-in-out"
              type="submit"
            >
              Apply
            </button>
            <button
              className="bg-gray-300 text-gray-700 font-medium text-sm py-1 px-5 rounded-full hover:bg-gray-400 transition duration-200 ease-in-out ml-2"
              type="button"
              onClick={() => {
                setBusinessName('');
                setCity('');
                setMinGuests('');
                setMaxGuests('');
                setFoodPackage('');
                setFacilities('');
                setVenueTypes('');
                onFilterChange({});
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsOpen(!isOpen);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FilterBar;
