import React, { useState, useEffect } from "react";
import {
  addCategory,
  getCategories,
  deleteCategory,
  getExpenses
} from "../services/expenseService";
import EditCategoryPopup from "./EditCategoryPopup";
import { FaTrash, FaEdit } from "react-icons/fa";

function AddCategoryForm() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const loadCategories = async () => {
    setCategories(await getCategories());
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addCategory({ name });
    setName("");
    loadCategories();
  };

  // ------------- NEW FUNCTION -------------
  const handleDeleteCategory = async (id) => {
    // Get all expenses
    const expenses = await getExpenses();

    // Check if any expense uses this category
    const isUsed = expenses.some((e) => e.category && e.category.id === id);

    if (isUsed) {
      alert("❌ Can't delete! This category is used in an expense.");
      return;
    }

    // Safe to delete
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <div>
      <h3>Add Category</h3>

      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <EditCategoryPopup
        open={!!editingCategory}
        category={editingCategory}
        onClose={() => setEditingCategory(null)}
        refresh={loadCategories}
      />

      <ul>
        {categories.map((cat) => (
          <li key={cat.id} className="category-item">
            {cat.name}

            <FaEdit
              className="edit-icon"
              onClick={() => setEditingCategory(cat)}
            />

            <FaTrash
              className="delete-icon"
              onClick={() => handleDeleteCategory(cat.id)}
              title="Delete Category"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddCategoryForm;
