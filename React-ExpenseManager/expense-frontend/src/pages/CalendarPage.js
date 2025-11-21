import React, { useState } from "react";
import "./CalendarPage.css";

function CalendarPage({ expenses }) {
  // Track which month the user is viewing
  const [viewDate, setViewDate] = useState(new Date()); // current date
  const [selectedDate, setSelectedDate] = useState(null);

  // --- Calculate year/month based on viewDate ---
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth(); // 0-11

  // Group expenses by date (YYYY-MM-DD)
  const expenseMap = expenses.reduce((acc, exp) => {
    const date = exp.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(exp);
    return acc;
  }, {});

  // Calendar calculations
  const firstDay = new Date(year, month, 1).getDay(); // 0-6 weekday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [];

  // Empty slots before 1st day
  for (let i = 0; i < firstDay; i++) {
    daysArray.push({ empty: true });
  }

  // Add days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    daysArray.push({
      day,
      dateStr,
      expenses: expenseMap[dateStr] || [],
    });
  }

  // --- Handlers for Month Navigation ---
  const goToPreviousMonth = () => {
    const prev = new Date(year, month - 1, 1);
    setViewDate(prev);
  };

  const goToNextMonth = () => {
    const next = new Date(year, month + 1, 1);
    setViewDate(next);
  };

  // --- Monthly Total Calculation ---
  const monthlyTotal = expenses
    .filter((exp) => {
      const d = new Date(exp.date);
      return d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div className="calendar-container">
      {/* Month Navigation Header */}
      <div className="calendar-header">
        <button className="nav-btn" onClick={goToPreviousMonth}>
          ◀
        </button>

        <div>
          <h1 className="calendar-title">
            {viewDate.toLocaleString("default", { month: "long" })} {year}
          </h1>

          {/* ⬅ NEW: Monthly Total */}
          <h2 className="monthly-total">
            Total: ₹ {monthlyTotal.toLocaleString()}
          </h2>
        </div>

        <button className="nav-btn" onClick={goToNextMonth}>
          ▶
        </button>
      </div>

      {/* Grid */}
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="weekday">
            {d}
          </div>
        ))}

        {daysArray.map((item, idx) =>
          item.empty ? (
            <div key={idx} className="calendar-day empty"></div>
          ) : (
            <div
              key={idx}
              className="calendar-day"
              onClick={() => setSelectedDate(item)}
            >
              <div className="day-number">{item.day}</div>

              {item.expenses.length > 0 && (
                <div className="expense-preview">
                  ₹
                  {item.expenses
                    .reduce((t, e) => t + Number(e.amount), 0)
                    .toLocaleString()}
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* Modal */}
      {selectedDate && (
        <div className="modal-overlay" onClick={() => setSelectedDate(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>
              {new Date(selectedDate.dateStr).toLocaleDateString()} – Expenses
            </h2>

            {selectedDate.expenses.length === 0 ? (
              <p>No expenses recorded.</p>
            ) : (
              <ul>
                {selectedDate.expenses.map((exp) => (
                  <li key={exp.id}>
                    <strong>{exp.description}</strong> — ₹{exp.amount}
                  </li>
                ))}
              </ul>
            )}

            <button className="close-btn" onClick={() => setSelectedDate(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
