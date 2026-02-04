import React from "react";

const CustomTooltip = ({ active, payload }) => {
   {
    return (
      <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200">
        if (active && payload && payload.length)<p className="text-sm font-semibold text-purple-800 mb-1">
          {payload[0].name}
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
  return null;
};

export default CustomTooltip;