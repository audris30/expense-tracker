const expenses = [
    {
        id: 1,
        date: "2025-06-01",
        category: "Fuel",
        amount: 65,
        description: "Circle K"
    },
    {
        id: 2,
        date: "2025-06-03",
        category: "Service",
        amount: 250,
        description: "Oil change"
    },
    {
        id: 3,
        date: "2025-06-05",
        category: "Parking",
        amount: 15,
        description: "City center"
    },
    {
        id: 4,
        date: "2025-07-10",
        category: "Fuel",
        amount: 70,
        description: "Neste"
    }
];

module.exports = expenses; 

// Returns total amount of all expenses
function getTotalExpenses() {
    return expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0)
}

console.log(getTotalExpenses());


// Returns expenses by category
function getExpensesByCategory(category) {
    return expenses.filter((expense) => {
        return expense.category === category
    })
}

console.log(getExpensesByCategory("Fuel"));


// Returns total number of expenses
function getExpenseCount() {
    return expenses.length
}

console.log(getExpenseCount());


// Returns the most expensive expense
function getMostExpensiveExpense() {
    return expenses.reduce((currentMost, expense) => {
        return expense.amount > currentMost.amount
            ? expense
            : currentMost
    })
}

console.log(getMostExpensiveExpense());


function getExpensesByMonth(month) {
    return expenses.filter((expense) => {
        return expense.date.slice(5, 7) === month;
    });
}

console.log(getExpensesByMonth("07"));


function addExpense(date, category, amount, description) {
    const newExpense = {
        id: expenses.length + 1,
        date,
        category,
        amount,
        description,
    }
    expenses.push(newExpense);
}

addExpense(
    "2025-08-01",
    "Fuel",
    90,
    "Baltic Petroleum"
);

console.log(expenses);


function removeExpense(id) {
    return expenses.filter((expense) => {
        return expense.id !== id
    });
}

console.log(removeExpense(3));


function getAverageExpense() {
    const total = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);
    return total / expenses.length;
}

console.log(getAverageExpense());


function getExpensesAboveAverage() {
    const total = expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0);

    const average = total / expenses.length;

    return expenses.filter((expense) => {
        return expense.amount > average;
    });
}

console.log(getExpensesAboveAverage());


function getMinMaxExpense() {
    const min = expenses.reduce((current, expense) => {
        return expense.amount < current.amount ? expense : current;
    }, expenses[0]);

    const max = expenses.reduce((current, expense) => {
        return expense.amount > current.amount ? expense : current;
    }, expenses[0]);

    return { min, max };
}

console.log(getMinMaxExpense()); 


function printSummary() {
    const total = getTotalExpenses(); 
    const count = getExpenseCount();
    const average = getAverageExpense(); 
    const minMax = getMinMaxExpense(); 

console.log("===== EXPENSE SUMMARY =====");
console.log("Total:", total);
console.log("Count:", count);
console.log("Average:", average);
console.log("Min expense:", minMax.min);
console.log("Max expense:", minMax.max);

}

printSummary(); 

