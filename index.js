const expenseService = require("./expenseService");

// SETUP (testas)
expenseService.deleteExpense(1);
expenseService.addExpense({
    id: 6,
    date: "2025-07-20",
    category: "Food",
    amount: 30,
    description: "Lunch"
});

// REPORT
const report = {
    count: expenseService.getExpenseCount(),
    total: expenseService.getTotalExpenses(),
    average: expenseService.getAverageExpense(),
    fuel: expenseService.getFuelTotal(),
    max: expenseService.getMaxExpense()
};

console.log("===== EXPENSE REPORT =====");
console.log(report);