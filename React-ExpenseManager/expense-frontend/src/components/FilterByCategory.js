import React, { useState, useEffect } from "react";
import { getCategories } from "../services/expenseService";

function FilterByCategory({ onFilter }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getCategories();

      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      setCategories(sorted);
    };
    load();
  }, []);

  return (
    <div>
      <h3>Filter by Category</h3>

      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterByCategory;
