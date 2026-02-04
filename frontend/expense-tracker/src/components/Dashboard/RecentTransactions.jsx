import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => {
          // 1. IMPROVED LOGIC: 
          // Default to the type from your database.
          // If it's specifically "Salary", force it to be "income".
          let displayType = item.type?.toLowerCase();
          
          if (item.source === "Salary") {
            displayType = "income";
          }

          return (
            <TransactionInfoCard
              key={item._id}
              // 2. Title: Use 'source' for income, 'category' for expense
              title={displayType === "income" ? item.source : item.category}
              // 3. Icons: Wallet for income, Utensils for expense (matching your Food entry)
              icon={item.icon || (displayType === "income" ? "LuWalletMinimal" : "LuUtensils")}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={displayType} 
              hideDeleteBtn
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactions;