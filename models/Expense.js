const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: String,
  category: String,
  amount: Number,
  description: String
});

module.exports = mongoose.model("Expense", expenseSchema);