import React, { useEffect, useState } from "react";
import { getCategoryTotals } from "../services/expenseService";

function CategoryTotals() {
  const [totals, setTotals] = useState([]);

  useEffect(() => {
    loadTotals();
  }, []);

  const loadTotals = async () => {
    try {
      const data = await getCategoryTotals();
      setTotals(data);
    } catch (err) {
      console.error("Error loading category totals:", err);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Total Expense by Category</h2>

      <table border="1" cellPadding="10" style={{ width: "50%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Amount (₹)</th>
          </tr>
        </thead>

        <tbody>
          {totals.map((t) => (
            <tr key={t.categoryId}>
              <td>{t.categoryName}</td>
              <td>{t.totalAmount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTotals;
