// src/components/CalendarSidebar.js
import React, { useMemo, useState } from "react";

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function formatDay(d) {
  return d.getDate();
}

export default function CalendarSidebar({ selectedDate, setSelectedDate, expensesByDate }) {
  const [cursor, setCursor] = useState(() => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  const monthMatrix = useMemo(() => {
    const start = startOfMonth(cursor);
    const end = endOfMonth(cursor);
    const startWeekDay = start.getDay(); // 0 Sun ... 6 Sat
    const daysInMonth = end.getDate();

    const rows = [];
    let dayCounter = 1 - startWeekDay; // start from first cell in calendar
    for (let r = 0; r < 6; r++) {
      const week = [];
      for (let c = 0; c < 7; c++) {
        const d = new Date(cursor.getFullYear(), cursor.getMonth(), dayCounter);
        week.push(d);
        dayCounter++;
      }
      rows.push(week);
      if (dayCounter > daysInMonth) break; // reduce extra rows
    }
    return rows;
  }, [cursor]);

  const goPrev = () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1));
  const goNext = () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1));

  const todayKey = new Date().toISOString().split("T")[0];

  return (
    <aside className="calendar-sidebar">
      <div className="calendar-header">
        <button onClick={goPrev} className="nav-btn">◀</button>
        <div className="calendar-month">
          {cursor.toLocaleString(undefined, { month: "long", year: "numeric" })}
        </div>
        <button onClick={goNext} className="nav-btn">▶</button>
      </div>

      <div className="week-days">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="week-day">{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {monthMatrix.map((week, i) => (
          <div key={i} className="calendar-row">
            {week.map((d) => {
              const key = d.toISOString().split("T")[0];
              const isCurrentMonth = d.getMonth() === cursor.getMonth();
              const badge = expensesByDate[key]?.length || 0;
              const isSelected =
                d.getFullYear() === selectedDate.getFullYear() &&
                d.getMonth() === selectedDate.getMonth() &&
                d.getDate() === selectedDate.getDate();

              return (
                <div
                  key={key}
                  className={
                    "calendar-cell " +
                    (isCurrentMonth ? "" : "muted ") +
                    (isSelected ? "selected " : "") +
                    (key === todayKey ? "today " : "")
                  }
                  onClick={() => setSelectedDate(new Date(d.getFullYear(), d.getMonth(), d.getDate()))}
                >
                  <div className="cell-day">{formatDay(d)}</div>
                  {badge > 0 && <div className="cell-badge">{badge}</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
