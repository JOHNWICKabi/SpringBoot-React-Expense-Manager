# SpringBoot-React-Expense-Manager

---

# 💰 Expense Manager – Spring Boot + React Full-Stack Application

A full-stack Expense Manager application built using **Spring Boot** for the backend and **React** for the frontend. It allows users to add, categorize, filter, and track expenses with a clean UI and features like calendar-based monthly summaries.

---

## 🚀 Features

* Add expenses with amount, date, and category
* Filter expenses by category
* Calendar view with automatic monthly total calculation
* Real-time UI updates with state management
* Layered backend architecture: Controller → Service → Repository
* DTO-based clean request/response objects
* Consistent REST API design
* Organized frontend with components + pages structure

---

## 🧰 Tech Stack

### **Backend**

* Java
* Spring Boot

  * Spring Web
  * Spring Data JPA
* Lombok
* Postgres 

### **Frontend**

* React
* React Router
* Axios

---

## 🏗️ Project Structure

<pre>
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
</pre>

---

## 📦 How to Run

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/expense-manager.git
cd expense-manager
```

---

## ▶️ Backend Setup (Spring Boot)

### **2. Navigate to Backend**

```bash
cd backend
```

### **3. Configure Database**

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expenses
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.jpa.hibernate.ddl-auto=update
```

### **4. Run Backend**

```bash
./mvnw spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

## 💻 Frontend Setup (React)

### **5. Navigate to Frontend**

```bash
cd ../frontend
```

### **6. Install Dependencies**

```bash
npm install
```

### **7. Run React App**

```bash
npm start
```

Frontend runs on:

```
http://localhost:3000
```

# 📌 **Complete Backend API Endpoints**

## 🟦 **Category APIs**

Base URL: `/api/categories`

| Method     | Endpoint               | Description           |
| ---------- | ---------------------- | --------------------- |
| **POST**   | `/api/categories`      | Create a new category |
| **GET**    | `/api/categories`      | Get all categories    |
| **GET**    | `/api/categories/{id}` | Get category by ID    |
| **DELETE** | `/api/categories/{id}` | Delete category       |

---

## 🟥 **Expense APIs**

Base URL: `/api/expenses`

| Method     | Endpoint                                             | Description                               |
| ---------- | ---------------------------------------------------- | ----------------------------------------- |
| **POST**   | `/api/expenses`                                      | Create a new expense                      |
| **GET**    | `/api/expenses`                                      | Get all expenses                          |
| **PUT**    | `/api/expenses/{id}`                                 | Update expense by ID                      |
| **DELETE** | `/api/expenses/{id}`                                 | Delete expense                            |
| **GET**    | `/api/expenses/category/{categoryId}`                | Get expenses by category ID               |
| **GET**    | `/api/expenses/category/{categoryId}/total`          | Get total amount for a category           |
| **GET**    | `/api/expenses/category/total`                       | Get total amount for all categories       |
| **GET**    | `/api/expenses/monthly`                              | Get monthly expense summary               |
| **GET**    | `/api/expenses/average`                              | Get overall average expense               |

---

## 🟩 **Joke API**

Base URL: `/api/jokes`

| Method  | Endpoint     | Description       |
| ------- | ------------ | ----------------- |
| **GET** | `/api/jokes` | Get a random joke |

---

## 🖼️ Core UI Pages (Frontend)

| Page                | Description                    |
| ------------------- | ------------------------------ |
| **Home Page**       | Displays all expenses          |
| **Add Expense**     | Form to add new expense        |
| **Category Filter** | Dropdown filter for categories |
| **Calendar Page**   | Shows monthly expense totals   |

---

## 📚 High-Level Architecture

```text
[ React Frontend ]  --->  [ Spring Boot REST API ]
                                 |
                                 v
                         [ Spring Data JPA / Postgres ]
```

---
