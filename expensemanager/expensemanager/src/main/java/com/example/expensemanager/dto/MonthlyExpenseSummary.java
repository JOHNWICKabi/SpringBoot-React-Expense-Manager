package com.example.expensemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MonthlyExpenseSummary {
    private int year;
    private int month;
    private double totalAmount;
}
