import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AddExpenseForm from "./components/AddExpenseForm";
import FilterByCategory from "./components/FilterByCategory";
import ExpenseList from "./components/ExpenseList";
import CategoryPage from "./pages/CategoryPage";
import CalendarPage from "./pages/CalendarPage";

import CategoryTotals from "./components/CategoryTotals";   // ⬅ NEW IMPORT

import { getExpenses } from "./services/expenseService";
import { getJoke } from "./services/jokeService";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [joke, setJoke] = useState("");

  // Load all expenses
  const loadExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  // Load joke once
  const loadJoke = async () => {
    try {
      const jokeText = await getJoke();
      setJoke(jokeText);
    } catch (err) {
      console.error("Error loading joke:", err);
    }
  };

  // Filter expenses by category
  const filterExpenses = async (catId) => {
    const allData = await getExpenses();

    if (catId === "") {
      setExpenses(allData);
      return;
    }

    const filtered = allData.filter(
      (exp) => exp.category && exp.category.id === Number(catId)
    );

    setExpenses(filtered);
  };

  useEffect(() => {
    loadExpenses();
    loadJoke();
  }, []);

  return (
    <Router>
      {/* TOP JOKE BANNER */}
      <div
        style={{
          background: "#f0f0f0",
          padding: "10px",
          marginBottom: "10px",
          borderBottom: "1px solid #ccc",
          fontStyle: "italic",
        }}
      >
        {joke || "Fetching a joke for you... 😂"}
      </div>

      {/* GLOBAL NAVIGATION */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Expenses</Link> |{" "}
        <Link to="/categories">Manage Categories</Link> |{" "}
        <Link to="/calendar">Expenses by Calendar</Link>
      </nav>

      {/* GLOBAL CATEGORY FILTER */}
      <FilterByCategory onFilter={filterExpenses} />

      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <div>
              <h1>Expense Manager</h1>

              <AddExpenseForm onExpenseAdded={loadExpenses} />

              {/* ⬅ NEW CATEGORY TOTALS COMPONENT */}
              <CategoryTotals />

              <ExpenseList expenses={expenses} refresh={loadExpenses} />
            </div>
          }
        />

        {/* CATEGORY PAGE */}
        <Route path="/categories" element={<CategoryPage />} />

        {/* CALENDAR PAGE */}
        <Route path="/calendar" element={<CalendarPage expenses={expenses} />} />
      </Routes>
    </Router>
  );
}

export default App;
