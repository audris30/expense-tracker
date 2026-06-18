const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log("ROOT HIT");
    return res.send("ROOT VEIKIA");
});

app.get("/test", (req, res) => {
    console.log("TEST HIT");
    return res.send("TEST VEIKIA");
});

app.listen(3333, () => {
    console.log("Server is running on port 3333");
});

app.use(express.json());

let expenses = [];

app.get("/expenses", (req, res) => {
    res.json(expenses);
});

app.post("/expenses", (req, res) => {
    const { date, category, amount, description } = req.body;

    // VALIDATION
    if (!date || !category || !amount) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const newExpense = {
        _id: Date.now().toString(),
        date,
        category,
        amount: Number(amount),
        description
    };

    expenses.push(newExpense);

    res.json(newExpense);
});

app.delete("/expenses/:id", (req, res) => {
    expenses = expenses.filter(e => e._id !== req.params.id);
    res.json({ message: "deleted" });
});

app.put("/expenses/:id", (req, res) => {
    expenses = expenses.map(e =>
        e._id === req.params.id ? { ...e, ...req.body } : e
    );

    res.json({ message: "updated" });
});

