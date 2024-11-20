import React, { useState } from "react";

interface VenueSummaryProps {
  summary?: string;
  maxCharacters?: number;
}

const VenueSummary: React.FC<VenueSummaryProps> = ({ summary, maxCharacters = 150 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const displaySummary = expanded ? summary : summary?.slice(0, maxCharacters) + "...";

  return (
    <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-4 mx-auto">
      {/* Header */}
      <h3 className="text-3xl font-semibold text-gray-800">Venue Summary</h3>

      {/* Summary Content */}
      <p className="text-base text-gray-700">{displaySummary}</p>

      {/* Read More / Read Less Button */}
      {(summary?.length ?? 0) > maxCharacters && (
        <button
          onClick={toggleExpanded}
          className="text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none transition-colors duration-300"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default VenueSummary;
