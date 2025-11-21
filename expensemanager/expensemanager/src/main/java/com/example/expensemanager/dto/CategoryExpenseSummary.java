package com.example.expensemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CategoryExpenseSummary {
    private Long categoryId;
    private String categoryName;
    private double totalAmount;
}
