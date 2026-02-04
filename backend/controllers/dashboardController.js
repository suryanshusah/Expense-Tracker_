const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

//Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        //Fetch total income and total expense
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        //Get income transactions in the last 60 days
        const last60DaysIncomeTransaction = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //Get total Income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //Get total Expense for last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch last 5 transactions (Combined income + expense)
        const incomeTransactions = await Income.find({ userId }).sort({ date: -1 }).limit(5);
        const expenseTransactions = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

        const lastTransaction = [
            ...incomeTransactions.map((txn) => ({
                ...txn.toObject(),
                type: "income",
            })),
            ...expenseTransactions.map((txn) => ({
                ...txn.toObject(),
                type: "expense",
            })),
        ]
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date latest first
            .slice(0, 5); // Get only the top 5

        //Final report
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,

            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransaction,
            },
            recentTransactions: lastTransaction,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error while connection to dashboard", error });
    }
};