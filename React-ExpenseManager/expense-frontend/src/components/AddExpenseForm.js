import React, { useState } from "react";
import { addExpense } from "../services/expenseService";
import CategoryDropdown from "./CategoryDropdown";

function AddExpenseForm({ onExpenseAdded }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim() || !amount || !date || !categoryId) {
      setMessage("All fields are required");
      return;
    }

    if (amount <= 0) {
      setMessage("Amount must be greater than 0");
      return;
    }

    await addExpense({
      description,
      amount,
      date,
      categoryId,
    });

    setMessage("Expense added successfully!");
    setDescription("");
    setAmount("");
    setDate("");
    setCategoryId("");

    onExpenseAdded(); // refresh list
  };

  return (
    <div>
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <CategoryDropdown value={categoryId} onChange={setCategoryId} />

        <button type="submit">Add</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

export default AddExpenseForm;
