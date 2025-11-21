import React, { useState, useEffect } from "react";
import {
  addCategory,
  getCategories,
  deleteCategory,
  getExpenses
} from "../services/expenseService";

import EditCategoryPopup from "../components/EditCategoryPopup";
import { FaTrash, FaEdit } from "react-icons/fa";

function CategoryPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const loadCategories = async () => setCategories(await getCategories());
  const loadExpenses = async () => setExpenses(await getExpenses());

  useEffect(() => {
    loadCategories();
    loadExpenses();
  }, []);

  // ADD CATEGORY
  const handleAdd = async (e) => {
    e.preventDefault();
    if (name.trim() === "") return alert("Category name cannot be empty");

    await addCategory({ name });
    setName("");
    loadCategories();
  };

  // DELETE CATEGORY WITH CHECK + TRY CATCH
  const handleDeleteCategory = async (categoryId, categoryName) => {
    try {
      // Check if category is used in expenses
      const isUsed = expenses.some(
        (exp) => exp.category && exp.category.id === categoryId
      );

      if (isUsed) {
        alert(`Can't delete "${categoryName}" since it is used in an expense.`);
        return;
      }

      // Safe to delete
      await deleteCategory(categoryId);
      loadCategories();

    } catch (err) {
      console.error(err);
      alert("Error deleting category");
    }
  };

  return (
    <div>
      <h1>Manage Categories</h1>

      {/* ADD CATEGORY FORM */}
      <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* EDIT POPUP */}
      <EditCategoryPopup
        open={!!editingCategory}
        category={editingCategory}
        onClose={() => setEditingCategory(null)}
        refresh={loadCategories}
      />

      {/* CATEGORY LIST */}
      <ul>
        {categories.map((cat) => (
          <li key={cat.id} className="category-item">
            {cat.name}

            <FaEdit
              className="edit-icon"
              onClick={() => setEditingCategory(cat)}
              title="Edit Category"
            />

            <FaTrash
              className="delete-icon"
              onClick={() => handleDeleteCategory(cat.id, cat.name)}
              title="Delete Category"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPage;
