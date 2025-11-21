import React, { useState, useEffect } from "react";
import { updateExpense } from "../services/expenseService";

function EditExpenseModal({ open, onClose, expense, refresh }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
    categoryId: ""
  });

  useEffect(() => {
    if (expense) {
      setForm({
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
        categoryId: expense.category.id
      });
    }
  }, [expense]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateExpense(expense.id, form);
    refresh();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Edit Expense</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
          />

          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="Amount"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <button type="submit">Update</button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditExpenseModal;
