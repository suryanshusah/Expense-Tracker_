import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions = [], onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!transactions.length) {
      setChartData([]);
      return;
    }

    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earning over time and analyze your income trends.
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        {chartData.length > 0 ? (
         <CustomBarChart
            data={chartData}
              xKey="month"
              labelKey="source"
          />
        ) : (
          <p className="text-sm text-gray-400 text-center">
            No income data available
          </p>
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
