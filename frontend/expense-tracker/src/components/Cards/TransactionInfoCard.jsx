import React from "react";
import * as LucideIcons from "react-icons/lu"; // Import all icons to map the string
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn}) => {
  
  // 1. RESOLVE THE ICON: 
  // If 'icon' is a string like "LuPizza", we look it up in LucideIcons.
  // Otherwise, we default to LuUtensils.
  const IconComponent = LucideIcons[icon] || LuUtensils;

  // 2. CASE-INSENSITIVE TYPE CHECK:
  const isIncome = type?.toLowerCase() === "income";

  const getAmountStyles = () =>
    isIncome ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500";

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 transition-all">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
        <IconComponent className="w-5 h-5 text-gray-700" />
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition cursor-pointer"
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
            <span className="text-sm font-semibold">
              {isIncome ? '+' : '-'} ${amount}
            </span>
            {isIncome ? <LuTrendingUp size={16} /> : <LuTrendingDown size={16} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;