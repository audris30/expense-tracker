const Expense = require("../models/Expense");

// GET all
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE
const createExpense = async (req, res) => {
    try {
        console.log(req.body);
        console.log("POST HIT");
        console.log("🔥 POST PASIEKĖ SERVERĮ");
        const expense = await Expense.create(req.body);
        res.json(expense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE
const updateExpense = async (req, res) => {
    try {
        const updated = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getExpenses,
    createExpense,
    deleteExpense,
    updateExpense
};