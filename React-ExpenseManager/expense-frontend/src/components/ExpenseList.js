import React, { useState } from "react";
import { deleteExpense } from "../services/expenseService";
import { FaTrash, FaEdit } from "react-icons/fa";
import EditExpenseModal from "./EditExpenseModal";

function ExpenseList({ expenses, refresh }) {
  const [editingExpense, setEditingExpense] = useState(null);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("newest"); // default sort

  const handleDelete = async (id) => {
    await deleteExpense(id);
    refresh();
  };

  // ---------------------------------
  // SEARCH FILTER
  // ---------------------------------
  const filtered = expenses.filter((exp) => {
    const text = search.toLowerCase();
    return (
      exp.description.toLowerCase().includes(text) ||
      String(exp.amount).includes(text) ||
      new Date(exp.date).toLocaleDateString().includes(text)
    );
  });

  // ---------------------------------
  // SORTING LOGIC
  // ---------------------------------
  const sorted = [...filtered].sort((a, b) => {
    switch (sortType) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "amountLowHigh":
        return a.amount - b.amount;
      case "amountHighLow":
        return b.amount - a.amount;
      default:
        return 0;
    }
  });

  return (
    <div>
      <h2>All Expenses</h2>

      {/* Search + Sort Controls */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="newest">Newest → Oldest</option>
          <option value="oldest">Oldest → Newest</option>
          <option value="amountLowHigh">Amount: Low → High</option>
          <option value="amountHighLow">Amount: High → Low</option>
        </select>
      </div>

      {/* Edit Expense Modal */}
      <EditExpenseModal
        open={!!editingExpense}
        expense={editingExpense}
        refresh={refresh}
        onClose={() => setEditingExpense(null)}
      />

      {sorted.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul>
          {sorted.map((expense) => (
            <li key={expense.id} style={{ marginBottom: "12px" }}>
              <strong>{expense.description}</strong> – ₹{expense.amount}
              <br />
              <small style={{ opacity: 0.7 }}>
                📅 {new Date(expense.date).toLocaleDateString()}
              </small>

              {/* EDIT BUTTON */}
              <button
                className="edit-btn"
                onClick={() => setEditingExpense(expense)}
                title="Edit"
                style={{ marginLeft: "10px" }}
              >
                <FaEdit />
              </button>

              {/* DELETE BUTTON */}
              <button
                className="delete-btn"
                onClick={() => handleDelete(expense.id)}
                title="Delete"
                style={{ marginLeft: "10px" }}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
