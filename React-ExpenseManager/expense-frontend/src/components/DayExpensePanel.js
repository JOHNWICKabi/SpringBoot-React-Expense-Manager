// src/components/DayExpensePanel.js
import React, { useMemo, useState } from "react";
import { deleteExpense } from "../services/expenseService";
import { FaTrash, FaEdit } from "react-icons/fa";
import EditExpenseModal from "./EditExpenseModal";

export default function DayExpensePanel({ date, expenses = [], refreshAll }) {
  const [editingExpense, setEditingExpense] = useState(null);

  const dateKey = date.toISOString().split("T")[0];

  const total = useMemo(() => {
    return (expenses || []).reduce((s, e) => s + Number(e.amount || 0), 0);
  }, [expenses]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await deleteExpense(id);
      await refreshAll();
    } catch (err) {
      console.error(err);
      alert("Error deleting expense");
    }
  };

  return (
    <main className="day-panel">
      <div className="day-panel-header">
        <h2>{date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</h2>
        <div className="day-total">Total: ₹{total}</div>
      </div>

      <EditExpenseModal
        open={!!editingExpense}
        expense={editingExpense}
        refresh={refreshAll}
        onClose={() => setEditingExpense(null)}
      />

      <div className="day-expenses-list">
        {expenses.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No expenses for {dateKey}</p>
        ) : (
          expenses.map((e) => (
            <div key={e.id} className="expense-card">
              <div className="expense-left">
                <div className="expense-desc">{e.description}</div>
                <div className="expense-meta">
                  <small>{e.category?.name || "Uncategorized"}</small>
                  <small> • {new Date(e.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>
                </div>
              </div>

              <div className="expense-right">
                <div className="expense-amount">₹{e.amount}</div>
                <div className="expense-actions">
                  <button className="icon-btn" onClick={() => setEditingExpense(e)} title="Edit"><FaEdit /></button>
                  <button className="icon-btn" onClick={() => handleDelete(e.id)} title="Delete"><FaTrash /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
