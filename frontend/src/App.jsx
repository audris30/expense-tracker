import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    date: "",
    category: "",
    amount: "",
    description: ""
  });

  const [search, setSearch] = useState("");

  const COLORS = ["#ff6b6b", "#4dabf7", "#51cf66"];

  // GET
  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:3333/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // EDIT
  const handleEdit = (expense) => {
    setForm({
      date: expense.date,
      category: expense.category,
      amount: expense.amount,
      description: expense.description
    });

    setEditId(expense._id);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  // SUBMIT (CREATE + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:3333/expenses/${editId}`,
          {
            ...form,
            amount: Number(form.amount)
          }
        );
      } else {
        await axios.post("http://localhost:3333/expenses", {
          ...form,
          amount: Number(form.amount)
        });
      }

      setForm({
        date: "",
        category: "",
        amount: "",
        description: ""
      });

      setEditId(null);

      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  // TOTALS
  const total = expenses.reduce(
    (sum, e) => sum + (Number(e.amount) || 0),
    0
  );

  const fuelTotal = expenses.reduce(
    (sum, e) =>
      e.category === "Fuel" ? sum + (Number(e.amount) || 0) : sum,
    0
  );

  const serviceTotal = expenses.reduce(
    (sum, e) =>
      e.category === "Service" ? sum + (Number(e.amount) || 0) : sum,
    0
  );

  const parkingTotal = expenses.reduce(
    (sum, e) =>
      e.category === "Parking" ? sum + (Number(e.amount) || 0) : sum,
    0
  );

  const chartData = [
    { name: "Fuel", value: fuelTotal },
    { name: "Service", value: serviceTotal },
    { name: "Parking", value: parkingTotal }
  ];

  const filteredExpenses = expenses.filter((e) => {
    return (
      e.category?.toLowerCase().includes(search.toLowerCase()) ||
      e.description?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="container">
      <h1>Car Expense Tracker</h1>
      
      <input
        type="text"
        placeholder="Search (fuel, service, parking...)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TOTALS DASHBOARD */}
      <div className="summary">

        {/* LEFT SIDE - numbers */}
        <div className="summary-left">
          <div className="card total">
            <span>Total</span>
            <strong>{total} €</strong>
          </div>

          <div className="card fuel">
            <span>Fuel</span>
            <strong>{fuelTotal} €</strong>
          </div>

          <div className="card service">
            <span>Service</span>
            <strong>{serviceTotal} €</strong>
          </div>

          <div className="card parking">
            <span>Parking</span>
            <strong>{parkingTotal} €</strong>
          </div>
        </div>

        {/* RIGHT SIDE - chart */}
        <div className="summary-right">
          <div className="chart-wrapper">
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

      </div>

      {/* FORM */ }
  <form onSubmit={handleSubmit} className="form">
    <input
      type="date"
      name="date"
      value={form.date}
      onChange={handleChange}
    />

    <select
      name="category"
      value={form.category}
      onChange={handleChange}
    >
      <option value="">Select category</option>
      <option value="Fuel">Fuel</option>
      <option value="Service">Service</option>
      <option value="Parking">Parking</option>
    </select>

    <input
      type="number"
      name="amount"
      value={form.amount}
      onChange={handleChange}
      placeholder="Amount (€)"
    />

    <input
      type="text"
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Description"
    />

    <button type="submit">
      {editId ? "Update Expense" : "Add Expense"}
    </button>
  </form>


  {/* TABLE */ }
  <table border="1" cellPadding="8" style={{ width: "100%" }}>
    <thead>
      <tr>
        <th>Date</th>
        <th>Category</th>
        <th>Amount</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {[...filteredExpenses]
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
        .map((e) => (
          <tr key={e._id} className="expense-item">
            <td>{e.date}</td>
            <td>{e.category}</td>
            <td>{e.amount}€</td>
            <td>{e.description}</td>
            <td>
              <button onClick={() => handleEdit(e)}>Edit</button>
              <button onClick={() => handleDelete(e._id)}>Delete</button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
    </div >
  );
}

export default App;
