require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());

// =====================
// ROUTES
// =====================
app.use("/expenses", expenseRoutes);

// =====================
// ROOT
// =====================
app.get("/", (req, res) => {
    res.send("API VEIKIA");
});

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

// optional debug (gali palikti arba ištrinti)
mongoose.set("debug", true);

// =====================
// SERVER START
// =====================
const PORT = process.env.PORT || 3333;

console.log("MONGO_URL:", process.env.MONGO_URL);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});