import React, { useState, useEffect } from "react";
import { updateCategory } from "../services/expenseService";

function EditCategoryPopup({ open, onClose, category, refresh }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) setName(category.name);
  }, [category]);

  if (!open) return null;

  const handleUpdate = async () => {
    await updateCategory(category.id, { name });
    refresh();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Edit Category</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleUpdate}>Update</button>
        <button onClick={onClose} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
}

export default EditCategoryPopup;
