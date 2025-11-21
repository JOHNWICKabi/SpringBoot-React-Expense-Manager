package com.example.expensemanager.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class CreateExpenseRequestDTO {
    private String description;
    private double amount;
    private Date date;
    private Long categoryId; 
}
