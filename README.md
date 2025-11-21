# SpringBoot-React-Expense-Manager

Expense Tracker – Spring Boot + React

A full-stack Expense Tracker application built using Spring Boot for the backend and React for the frontend. It allows users to add expenses, categorize them, filter by category, view monthly totals in a calendar, and manage daily spending with a clean and intuitive UI.

🚀 Features

Add and manage expenses with amount, date, and category

Filter expenses by category

Calendar view showing monthly total expenses

Organized listing of all expenses

Real-time UI updates and smooth navigation

Clean folder structure for both backend and frontend

🛠️ Tech Stack
Backend

Java

Spring Boot

Spring Web

Spring Data JPA

Postgres(PostgreSQL)

Lombok

Frontend

React

React Router

Axios

📂 Project Structure

project-root/
│
├── backend/
│   ├── src/main/java/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── DTOs/
│   │   └── repositories/
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── src/components/
    ├── src/pages/
    ├── src/App.js
    ├── package.json
    └── public/

⚙️ How It Works
Backend

Provides REST APIs for expenses and categories

Stores data in a relational database

Handles business logic for filtering and calculations

Frontend

Fetches API data using Axios

Displays all expenses with filter options

Includes a calendar page for monthly total calculation

Allows users to add and manage expenses interactively
