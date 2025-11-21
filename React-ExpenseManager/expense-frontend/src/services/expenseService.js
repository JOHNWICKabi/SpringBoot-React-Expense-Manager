import axios from "axios";

const API_BASE = "http://localhost:8080/api";

// Get all expenses
export const getExpenses = async () => {
  const res = await axios.get(`${API_BASE}/expenses`);
  return res.data;
};

// Add new expense
export const addExpense = async (expense) => {
  const res = await axios.post(`${API_BASE}/expenses`, expense);
  return res.data;
};

// Delete an expense
export const deleteExpense = async (id) => {
  const res = await axios.delete(`${API_BASE}/expenses/${id}`);
  return res.data;
};

// Filter expenses by category
export const getExpensesByCategory = async (catId) => {
  const res = await axios.get(`${API_BASE}/expenses?category=${catId}`);
  
  return res.data;
  
};

// Update an expense
export const updateExpense = async (id, expense) => {
  const res = await axios.put(`${API_BASE}/expenses/${id}`, expense);
  return res.data;
};

// Get total per category
export const getCategoryTotals = async () => {
  const res = await axios.get(`${API_BASE}/expenses/category/total`);
  return res.data;
};

// Get monthly totals
export const getMonthlyTotals = async () => {
  const res = await axios.get(`${API_BASE}/expenses/monthly`);
  return res.data;
};

// Get all categories
export const getCategories = async () => {
  const res = await axios.get(`${API_BASE}/categories`);
  return res.data;
};

// Add a new category
export const addCategory = async (category) => {
  const res = await axios.post(`${API_BASE}/categories`, category);
  return res.data;
};

// Delete category
export const deleteCategory = async (id) => {
  const res = await axios.delete(`${API_BASE}/categories/${id}`);
  return res.data;
};

// Update a category
export const updateCategory = async (id, category) => {
  const res = await axios.put(`${API_BASE}/categories/${id}`, category);
  return res.data;
};
