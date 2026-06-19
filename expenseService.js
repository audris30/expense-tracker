const expenses = require("./expenses");

// =====================
// BASIC STATS
// =====================

function getExpenseCount() {
    return expenses.length;
}

function getTotalExpenses() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

function getAverageExpense() {
    if (expenses.length === 0) return 0;
    return Number((getTotalExpenses() / getExpenseCount()).toFixed(2));
}

// =====================
// FILTERS
// =====================

function getFuelTotal() {
    return expenses
        .filter(expense => expense.category === "Fuel")
        .reduce((sum, expense) => sum + expense.amount, 0);
}

function getExpensesByCategory(category) {
    return expenses.filter(expense => expense.category === category);
}

function getMaxExpense() {
    if (expenses.length === 0) return 0;

    return Math.max(...expenses.map(expense => expense.amount));
}

// =====================
// CRUD
// =====================

let nextId = expenses.length > 0
    ? Math.max(...expenses.map(e => e.id)) + 1
    : 1;

function addExpense(expense) {
    const newExpense = {
        id: nextId++,
        ...expense
    };

    expenses.push(newExpense);
    return newExpense;
}

function deleteExpense(id) {
    const index = expenses.findIndex(expense => expense.id == id);

    if (index !== -1) {
        expenses.splice(index, 1);
        return true;
    }

    return false;
}

function updateExpense(id, updatedData) {
    const index = expenses.findIndex(expense => expense.id == id);

    if (index === -1) return null;

    expenses[index] = {
        ...expenses[index],
        ...updatedData
    };

    return expenses[index];
}

// =====================
// EXPORTS
// =====================

module.exports = {
    getExpenseCount,
    getTotalExpenses,
    getAverageExpense,
    getFuelTotal,
    getExpensesByCategory,
    getMaxExpense,
    addExpense,
    deleteExpense,
    updateExpense
};

