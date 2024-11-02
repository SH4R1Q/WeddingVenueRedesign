// import React, { useState } from 'react';

// interface FilterBarProps {
//   onFilterChange: (filters: any) => void;
// }

// const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
//   const [businessName, setBusinessName] = useState('');
//   const [city, setCity] = useState('');
//   const [minGuests, setMinGuests] = useState('');
//   const [maxGuests, setMaxGuests] = useState('');
//   const [foodPackage, setFoodPackage] = useState('');
//   const [facilities, setFacilities] = useState('');
//   const [venueTypes, setVenueTypes] = useState('');

//   const handleFilterSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const filters = {
//       businessName: businessName || undefined,
//       city: city || undefined,
//       minGuests: minGuests || undefined,
//       maxGuests: maxGuests || undefined,
//       foodPackage: foodPackage || undefined,
//       facilities: facilities || undefined,
//       venueTypes: venueTypes || undefined,
//     };
//     onFilterChange(filters);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <form
//       onSubmit={handleFilterSubmit}
//       // className="bg-white shadow-md rounded-2xl px-6 py-4 w-3/5 sticky top-0 z-10 mx-auto flex flex-wrap items-center justify-center gap-4 border border-gray-200"
//       className='bg-white shadow-lg rounded-2xl px-6 py-4 w-3/5 fixed top-75 left-1/2 transform -translate-x-1/2 z-10 flex flex-wrap items-center justify-center gap-4 border border-gray-200'
//     >
//       <input
//         className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
//         type="text"
//         placeholder="Venue Name"
//         value={businessName}
//         onChange={(e) => setBusinessName(e.target.value)}
//       />
//       <input
//         className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
//         type="text"
//         placeholder="City"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />
//       <input
//         className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
//         type="number"
//         placeholder="Min Guests"
//         value={minGuests}
//         onChange={(e) => setMinGuests(e.target.value)}
//       />
//       <input
//         className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
//         type="number"
//         placeholder="Max Guests"
//         value={maxGuests}
//         onChange={(e) => setMaxGuests(e.target.value)}
//       />
//       <input
//         className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
//         type="text"
//         placeholder="Food Package"
//         value={foodPackage}
//         onChange={(e) => setFoodPackage(e.target.value)}
//       />
//       <input
//         className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
//         type="text"
//         placeholder="Facilities"
//         value={facilities}
//         onChange={(e) => setFacilities(e.target.value)}
//       />
//       <input
//         className="px-3 py-1 text-gray-700 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
//         type="text"
//         placeholder="Venue Types"
//         value={venueTypes}
//         onChange={(e) => setVenueTypes(e.target.value)}
//       />
//       <div>
//       <button
//         className="bg-indigo-500 text-white font-medium text-sm py-1 px-5 rounded-full hover:bg-indigo-600 transition duration-200 ease-in-out"
//         type="submit">
//         Apply
//       </button>
//       <button
//         className="bg-gray-300 text-gray-700 font-medium text-sm py-1 px-5 rounded-full hover:bg-gray-400 transition duration-200 ease-in-out ml-2"
//         type="button"
//         onClick={() => {
//           setBusinessName('');
//           setCity('');
//           setMinGuests('');
//           setMaxGuests('');
//           setFoodPackage('');
//           setFacilities('');
//           setVenueTypes('');
//           onFilterChange({});
//           window.scrollTo({ top: 0, behavior: 'smooth' });
//         }}
//       >
//         Reset
//       </button>
//       </div>

//     </form>
//   );
// };

// export default FilterBar;


import React, { useState } from 'react';
// import { FaBars, FaTimes } from 'react-icons/fa'; 

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
  // const [isScrolled, setIsScrolled] = useState(false);

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
  };

  // // Scroll event listener
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 50) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div>
      <div className="rounded-full fixed top-15 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-300 
                      h-10 bg-white shadow-lg2 flex items-center justify-between px-4 hover:!bg-black">
        <button
          className="text-indigo-500 text-semibold font-roboto focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ?"Close" : "Open Filters"}
        </button>
      </div>
      {isOpen && (
        <form
          onSubmit={handleFilterSubmit}
          className="fixed top-15 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-300 bg-white shadow-lg2 rounded-2xl
                      w-3/5 mx-auto mt-10 flex flex-wrap items-center justify-center gap-4 border border-gray-200 p-4"
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
