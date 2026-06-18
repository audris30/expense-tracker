require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Expense = require("./models/Expense");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/expenses", expenseRoutes);

console.log("MONGO URL:", process.env.MONGO_URL);

// =====================
// MONGODB CONNECT
// =====================
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("❌ MongoDB error:");
        console.log(err);
    });

    mongoose.set("debug", true);

// =====================
// ROOT
// =====================
app.get("/", (req, res) => {
    res.send("API VEIKIA");
});

// =====================
// GET ALL
// =====================
app.get("/expenses", async (req, res) => {
    try {
        const expenses = await Expense.find();

        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =====================
// UPDATE
// =====================
app.put("/expenses/:id", async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Expense updated",
            expense: updatedExpense
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =====================
// DELETE
// =====================
app.delete("/expenses/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);

        res.json({
            message: "Expense deleted"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =====================
// START SERVER
// =====================
app.listen(3333, () => {
    console.log("Server running on http://localhost:3333");
});