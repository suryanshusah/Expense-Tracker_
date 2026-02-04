import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {/* Added optional chaining and a fallback to prevent "map of undefined" errors */}
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category || expense.title}
              icon={expense.icon}
              // FIXED: Changed 'item.date' to 'expense.date'
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">No expenses recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;