import React from "react";

const CustomTooltip = ({ active, payload }) => {
  // 1. Move the safety check to the top of the function
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200">
        <p className="text-sm font-semibold text-purple-800 mb-1">
          {/* Use .name if nameKey="name" is set in your Pie/Bar chart */}
          {payload[0].name || payload[0].payload.name || payload[0].payload.source}
        </p>
        <p className="text-xs text-gray-600">
          Amount:{" "}
          <span className="text-sm font-bold text-gray-900">
            ${payload[0].value.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }

  // 2. Return null if the tooltip shouldn't be visible
  return null;
};

export default CustomTooltip;