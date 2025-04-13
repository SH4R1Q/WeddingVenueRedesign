import React, { useState } from 'react';
import { FaUsers, FaRupeeSign, FaHotel, FaStar } from "react-icons/fa";

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
        {/* Text for larger screens */}
        <span className="hidden sm:block">{label}</span>

        {/* Icons for smaller screens */}
        <span className="sm:hidden">
          {category === "guests" && <FaUsers />}
          {category === "foodPackage" && <FaRupeeSign />}
          {category === "venueTypes" && <FaHotel />}
          {category === "rating" && <FaStar />}
        </span>
      </button>
    );
  };

  return (
    <div>
      {/* Navigation for larger screens */}
      <div className="hidden sm:flex fixed top-21 left-0 right-0 bg-white p-2 z-10 justify-around border-b border-2 border-gray-200 mb-4">
        {/* No. of Guests */}
        <div className="relative">
          {renderHeader("No. of Guests", "guests")}
          {activeDropdown === "guests" &&
            renderOptions("guests", ["<100", "100-250", "250-500", "500-1000", ">1000"])}
        </div>

        {/* Price per Plate */}
        <div className="relative">
          {renderHeader("Price per Plate (₹)", "foodPackage")}
          {activeDropdown === "foodPackage" &&
            renderOptions("foodPackage", ["< 1,000", "1,000 - 1,500", "1,500 - 2,000", "2,000 - 3,000", "> 3,000"])}
        </div>

        {/* Venue Type */}
        <div className="relative">
          {renderHeader("Venue Type", "venueTypes")}
          {activeDropdown === "venueTypes" &&
            renderOptions("venueTypes", ["4 Star & Above", "Banquet Halls", "Marriage Garden", "3 Star Hotels", "Country/Golf Club"])}
        </div>

        {/* Rating */}
        <div className="relative">
          {renderHeader("Rating", "rating")}
          {activeDropdown === "rating" &&
            renderOptions("rating", ["All Ratings", "Rated <4", "Rated 4+", "Rated 4.5+", "Rated 4.8+"])}
        </div>

        {/* Apply and Reset Buttons */}
        <div className="flex items-center gap-4">
          <button
            className="bg-indigo-500 text-white py-1 px-3 rounded-full text-sm"
            onClick={handleApply}
          >
            Apply
          </button>
          <button
            className="bg-gray-300 text-gray-700 py-1 px-3 rounded-full text-sm"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Navigation for smaller screens */}
      <div className="sm:hidden fixed top-36 left-0 right-0 bg-white p-2 z-10 flex justify-around border-b border-2 border-gray-200 mb-4">
      {/* No. of Guests */}
      <div className="relative">
        {renderHeader("No. of Guests", "guests")}
        {activeDropdown === "guests" &&
          renderOptions("guests", ["<100", "100-250", "250-500", "500-1000", ">1000"])}
      </div>

      {/* Price per Plate */}
      <div className="relative">
        {renderHeader("Price per Plate (₹)", "foodPackage")}
        {activeDropdown === "foodPackage" &&
          renderOptions("foodPackage", ["< 1,000", "1,000 - 1,500", "1,500 - 2,000", "2,000 - 3,000", "> 3,000"])}
      </div>

      {/* Venue Type */}
      <div className="relative">
        {renderHeader("Venue Type", "venueTypes")}
        {activeDropdown === "venueTypes" &&
          renderOptions("venueTypes", ["4 Star & Above", "Banquet Halls", "Marriage Garden", "3 Star Hotels", "Country/Golf Club"])}
      </div>

      {/* Rating */}
      <div className="relative">
        {renderHeader("Rating", "rating")}
        {activeDropdown === "rating" &&
          renderOptions("rating", ["All Ratings", "Rated <4", "Rated 4+", "Rated 4.5+", "Rated 4.8+"])}
      </div>

      {/* Apply and Reset Buttons */}
      <div className="flex items-center gap-2 sm:flex-row flex-row">
        <button
          className="bg-indigo-500 text-white py-1 px-3 rounded-full text-sm"
          onClick={handleApply}
        >
          Apply
        </button>
        <button
          className="bg-gray-300 text-gray-700 py-1 px-3 rounded-full text-sm"
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
