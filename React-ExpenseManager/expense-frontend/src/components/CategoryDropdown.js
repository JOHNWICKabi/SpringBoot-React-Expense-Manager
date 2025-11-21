import React, { useEffect, useState } from "react";
import { getCategories } from "../services/expenseService";

function CategoryDropdown({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();

      // Sort alphabetically
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));

      setCategories(sorted);
    };
    loadCategories();
  }, []);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select Category</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}

export default CategoryDropdown;
