package com.example.expensemanager.service;

import com.example.expensemanager.model.Category;
import com.example.expensemanager.model.Expense;
import com.example.expensemanager.repository.CategoryRepository;
import com.example.expensemanager.repository.ExpenseRepository;
import com.example.expensemanager.dto.CategoryExpenseSummary;
import com.example.expensemanager.dto.CreateExpenseRequestDTO;
import com.example.expensemanager.dto.MonthlyExpenseSummary;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;

    public ExpenseService(ExpenseRepository expenseRepository, CategoryRepository categoryRepository) {
        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
    }

    public Expense createExpense(String description, double amount, java.util.Date date, Long categoryId) {
        Expense expense = new Expense();
        expense.setDescription(description);
        expense.setAmount(amount);
        expense.setDate(date);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        expense.setCategory(category);

        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense updateExpense(Long id, CreateExpenseRequestDTO dto) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setDescription(dto.getDescription());
        expense.setAmount(dto.getAmount());
        expense.setDate(dto.getDate());

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            expense.setCategory(category);
        }

        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new RuntimeException("Expense not found");
        }
        expenseRepository.deleteById(id);
    }


    public List<Expense> getExpensesByCategoryId(Long categoryId) {
        return expenseRepository.findByCategoryId(categoryId);
    }

    public double getTotalAmountByCategoryId(Long categoryId) {
        List<Expense> expenses = expenseRepository.findByCategoryId(categoryId);
        double total = 0.0;
        for (Expense expense : expenses) {
            total += expense.getAmount();
        }
        return total;
    }

    public List<CategoryExpenseSummary> getTotalAmountByAllCategories() {
        return expenseRepository.getTotalAmountByAllCategories();
    }

    public List<MonthlyExpenseSummary> getMonthlyTotalExpenses() {
        return expenseRepository.getMonthlyTotalExpenses();
    }

    public double getAverageExpense() {
        Double avg = expenseRepository.getAverageExpense();
        return avg != null ? avg : 0.0;
    }

    public double getAverageExpenseByWeek(int week, int year) {
        Double avg = expenseRepository.getAverageExpenseByWeek(week, year);
        return avg != null ? avg : 0.0;
    }

}
