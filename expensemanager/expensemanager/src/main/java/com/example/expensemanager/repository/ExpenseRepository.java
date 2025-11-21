package com.example.expensemanager.repository;

import com.example.expensemanager.dto.CategoryExpenseSummary;
import com.example.expensemanager.dto.MonthlyExpenseSummary;
import com.example.expensemanager.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByCategoryId(Long categoryId);

    List<Expense> findByAmountGreaterThan(double amount);

    List<Expense> findByDescriptionContaining(String keyword);

    @Query("SELECT new com.example.expensemanager.dto.CategoryExpenseSummary(" +
            "e.category.id, e.category.name, SUM(e.amount)) " +
            "FROM Expense e GROUP BY e.category.id, e.category.name " +
            "ORDER BY SUM(e.amount) DESC")
    List<CategoryExpenseSummary> getTotalAmountByAllCategories();

    @Query("SELECT new com.example.expensemanager.dto.MonthlyExpenseSummary(" +
            "YEAR(e.date), MONTH(e.date), SUM(e.amount)) " +
            "FROM Expense e GROUP BY YEAR(e.date), MONTH(e.date) " +
            "ORDER BY YEAR(e.date), MONTH(e.date)")
    List<MonthlyExpenseSummary> getMonthlyTotalExpenses();

    @Query("SELECT AVG(e.amount) FROM Expense e")
    Double getAverageExpense();

    //does not work change needed "week"
    @Query("SELECT AVG(e.amount) FROM Expense e WHERE FUNCTION('WEEK', e.date) = :week AND FUNCTION('YEAR', e.date) = :year")
    Double getAverageExpenseByWeek(int week, int year);

}
