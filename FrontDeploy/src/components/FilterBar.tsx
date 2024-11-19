import React, { useState } from 'react';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<any>({});
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleFilterChange = (category: string, value: string) => {
    setFilters((prev: any) => {
      const updatedValues = prev[category]?.includes(value)
        ? prev[category].filter((item: string) => item !== value)
        : [...(prev[category] || []), value];
      return { ...prev, [category]: updatedValues };
    });
  };

  const handleDropdownClick = (category: string) => {
    setActiveDropdown((prev) => (prev === category ? null : category));
  };

  const handleApply = () => {
    onFilterChange(filters);
    setActiveDropdown(null);
    console.log(filters);
  };

  const handleReset = () => {
    setFilters({});
    onFilterChange({});
    setActiveDropdown(null);
  };

  const renderOptions = (category: string, options: string[]) => (
    <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2 z-10 w-48">
      {options.map((option) => (
        <label key={option} className="block mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={filters[category]?.includes(option) || false}
            onChange={() => handleFilterChange(category, option)}
          />
          {option}
        </label>
      ))}
    </div>
  );

  const renderHeader = (label: string, category: string) => {
    const isOpen = activeDropdown === category;
    return (
      <button
        className="font-semibold flex items-center"
        onClick={() => handleDropdownClick(category)}
      >
        {label}
        <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
      </button>
    );
  };

  // city,
  //           minGuests,
  //           maxGuests,
  //           foodPackage,
  //           facilities,
  //           venueTypes,
  //           rating,
  //           guests,

  return (
    <div className="fixed top-21 left-0 right-0 bg-white p-2 z-10 flex justify-around">
      {/* No. of Guests */}
      <div className="relative">
        {renderHeader("No. of Guests", "guests")}
        {activeDropdown === "guests" &&
          renderOptions("guests", ["<100", "100-250", "250-500", "500-1000", ">1000"])}
      </div>

      {/* Room Count */}
      {/* <div className="relative">
        {renderHeader("Room Count", "roomCount")}
        {activeDropdown === "roomCount" &&
          renderOptions("roomCount", ["<30", "30-60", "61-100", "100-200", "200-1000"])}
      </div> */}

      {/* Price per Plate */}
      <div className="relative">
        {renderHeader("Price per Plate (₹)", "foodPackage")}
        {activeDropdown === "foodPackage" &&
          renderOptions("foodPackage", ["< 1,000", "1,000 - 1,500", "1,500 - 2,000", "2,000 - 3,000", "> 3,000"])}
      </div>

      {/* Rental Cost */}
      {/* <div className="relative">
        {renderHeader("Rental Cost", "rentalCost")}
        {activeDropdown === "rentalCost" &&
          renderOptions("rentalCost", ["< ₹1 Lakh", "₹1-2 Lakh", "₹2-4 Lakh", "₹4-6 Lakh", "> ₹6 Lakh"])}
      </div> */}

      {/* Venue Type */}
      <div className="relative">
        {renderHeader("Venue Type", "venueTypes")}
        {activeDropdown === "venueTypes" &&
          renderOptions("venueTypes", ["4 Star & Above", "Banquet Halls", "Marriage Garden", "3 Star Hotels", "Country/Golf Club"])}
      </div>

      {/* Space Type */}
      {/* <div className="relative">
        {renderHeader("Space", "space")}
        {activeDropdown === "space" &&
          renderOptions("space", ["Indoor", "Outdoor", "Poolside", "Terrace/Rooftop"])}
      </div> */}

      {/* Rating */}
      <div className="relative">
        {renderHeader("Rating", "rating")}
        {activeDropdown === "rating" &&
          renderOptions("rating", ["All Ratings", "Rated <4", "Rated 4+", "Rated 4.5+", "Rated 4.8+"])}
      </div>

      {/* Apply and Reset Buttons */}
        <div className="flex items-center gap-4">
          <button
            className="bg-indigo-500 text-white py-1 px-4 rounded-full"
            onClick={handleApply}
          >
            Apply
          </button>
          <button
            className="bg-gray-300 text-gray-700 py-1 px-4 rounded-full"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
    </div>
  );
};

export default FilterBar;
