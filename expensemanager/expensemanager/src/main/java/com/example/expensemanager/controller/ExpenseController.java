package com.example.expensemanager.controller;

import com.example.expensemanager.dto.CreateExpenseRequestDTO;
import com.example.expensemanager.model.Expense;
import com.example.expensemanager.service.ExpenseService;
import com.example.expensemanager.dto.CategoryExpenseSummary;
import com.example.expensemanager.dto.MonthlyExpenseSummary;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public Expense createExpense(@RequestBody CreateExpenseRequestDTO dto) {
        return expenseService.createExpense(
                dto.getDescription(),
                dto.getAmount(),
                dto.getDate(),
                dto.getCategoryId()
        );
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody CreateExpenseRequestDTO dto) {
        return expenseService.updateExpense(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return "Expense deleted successfully";
    }


    @GetMapping("/category/{categoryId}")
    public List<Expense> getExpensesByCategory(@PathVariable Long categoryId) {
        return expenseService.getExpensesByCategoryId(categoryId);
    }

    @GetMapping("/category/{categoryId}/total")
    public double getTotalExpenseAmountByCategory(@PathVariable Long categoryId) {
        return expenseService.getTotalAmountByCategoryId(categoryId);
    }

    @GetMapping("/category/total")
    public List<CategoryExpenseSummary> getTotalAmountByAllCategories() {
        return expenseService.getTotalAmountByAllCategories();
    }

    @GetMapping("/monthly")
    public List<MonthlyExpenseSummary> getMonthlyExpenseSummary() {
        return expenseService.getMonthlyTotalExpenses();
    }

    @GetMapping("/average")
    public double getAverageExpense() {
        return expenseService.getAverageExpense();
    }

    @GetMapping("/average/week")
    public double getAverageExpenseByWeek(@RequestParam int week, @RequestParam int year) {
        return expenseService.getAverageExpenseByWeek(week, year);
    }

}
