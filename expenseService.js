const expenses = require("./expenses");

function getExpenseCount() {
    return expenses.length;
}

function getTotalExpenses() {
    return expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0)
}

module.exports = {
    getExpenseCount,
    getTotalExpenses,
    getAverageExpense,
    getFuelTotal,
    getExpensesByCategory,
    getMaxExpense,
    addExpense,
    deleteExpense
}

function getAverageExpense() {
    return Number((getTotalExpenses() / getExpenseCount()).toFixed(2));
}

function getFuelTotal() {
    const fuelExpenses = expenses.filter((expense) => {
        return expense.category === "Fuel";
    });

    return fuelExpenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);
}

function getExpensesByCategory(category) {
    return expenses.filter((expense) => {
        return expense.category === category;
    });
}

function getMaxExpense() {
    return expenses.reduce((max, expense) => {
        return expense.amount > max ? expense.amount : max;
    }, 0);
}

function addExpense(expense) {
    expenses.push(expense);
}

function deleteExpense(id) {
    const index = expenses.findIndex((expense) => {
        return expense.id === id;
    });

    expenses.splice(index, 1);
}