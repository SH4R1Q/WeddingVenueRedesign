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

  return (
    <div className="fixed top-[84px] left-0 right-0 bg-white p-3 z-10 border-b border-2 border-gray-200">
      <div className="flex flex-wrap justify-between gap-4 sm:gap-6 md:justify-around items-start">
        
        {/* No. of Guests */}
        <div className="relative min-w-[140px]">
          {renderHeader("No. of Guests", "guests")}
          {activeDropdown === "guests" &&
            renderOptions("guests", ["<100", "100-250", "250-500", "500-1000", ">1000"])}
        </div>
  
        {/* Price per Plate */}
        <div className="relative min-w-[160px]">
          {renderHeader("Price per Plate (₹)", "foodPackage")}
          {activeDropdown === "foodPackage" &&
            renderOptions("foodPackage", ["< 1,000", "1,000 - 1,500", "1,500 - 2,000", "2,000 - 3,000", "> 3,000"])}
        </div>
  
        {/* Venue Type */}
        <div className="relative min-w-[160px]">
          {renderHeader("Venue Type", "venueTypes")}
          {activeDropdown === "venueTypes" &&
            renderOptions("venueTypes", ["4 Star & Above", "Banquet Halls", "Marriage Garden", "3 Star Hotels", "Country/Golf Club"])}
        </div>
  
        {/* Rating */}
        <div className="relative min-w-[140px]">
          {renderHeader("Rating", "rating")}
          {activeDropdown === "rating" &&
            renderOptions("rating", ["All Ratings", "Rated <4", "Rated 4+", "Rated 4.5+", "Rated 4.8+"])}
        </div>
  
        {/* Apply and Reset Buttons */}
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            className="bg-indigo-500 text-white py-1 px-4 rounded-full text-sm"
            onClick={handleApply}
          >
            Apply
          </button>
          <button
            className="bg-gray-300 text-gray-700 py-1 px-4 rounded-full text-sm"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default FilterBar;
