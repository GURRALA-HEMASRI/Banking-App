# 🏦 Banking Management System

A modern full-stack Banking Management System built using React.js, Spring Boot, and MySQL.  
The application allows users to manage banking operations such as account management, transactions, and customer details through a responsive and secure web interface.

---
# 📸 Screenshots
![Login](https://github.com/GURRALA-HEMASRI/Banking-App/blob/972759b931c9d04ff1bf350c4df1b20e56653766/login.png)
![Deposit](https://github.com/GURRALA-HEMASRI/Banking-App/blob/972759b931c9d04ff1bf350c4df1b20e56653766/deposit.png)
![WithDraw](https://github.com/GURRALA-HEMASRI/Banking-App/blob/972759b931c9d04ff1bf350c4df1b20e56653766/withdraw.png)
![Balance](https://github.com/GURRALA-HEMASRI/Banking-App/blob/972759b931c9d04ff1bf350c4df1b20e56653766/Balance.png)
![History](https://github.com/GURRALA-HEMASRI/Banking-App/blob/972759b931c9d04ff1bf350c4df1b20e56653766/history.png)

---
# 📌 Project Overview

This project simulates a real-world banking system where users can:

- Create and manage bank accounts
- Deposit and withdraw money
- View account details
- Perform CRUD operations
- Manage customer information
- Interact with REST APIs through a responsive frontend

The application follows a full-stack architecture using React for frontend development and Spring Boot for backend REST APIs.

---

# 🚀 Features

✅ Account Creation  
✅ Deposit & Withdrawal Operations  
✅ Account Management  
✅ REST API Integration  
✅ Responsive Dashboard UI  
✅ Full CRUD Functionality  
✅ Backend Database Connectivity  
✅ Modern Professional Interface  

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Axios
- React Router DOM
- CSS3

## Backend
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs

## Database
- MySQL

---

# 📂 Project Structure

```bash
banking-management-system/
│
├── backend/        # Spring Boot Backend
│
├── frontend/       # React Frontend
│
└── README.md
```

---

# ⚙️ Installation & Setup

# 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/banking-management-system.git
```

---

# 🔧 Backend Setup

## Navigate to backend folder

```bash
cd backend
```

## Configure Database

Create MySQL database:

```sql
CREATE DATABASE banking_db;
```

Update credentials inside:

```bash
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/banking_db
spring.datasource.username=root
spring.datasource.password=your_password
```

## Run Backend Server

```bash
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 💻 Frontend Setup

## Navigate to frontend folder

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔌 REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /accounts | Fetch all accounts |
| POST | /accounts | Create account |
| PUT | /accounts/{id} | Update account |
| DELETE | /accounts/{id} | Delete account |
| POST | /deposit | Deposit money |
| POST | /withdraw | Withdraw money |

---

# 🧠 Learning Outcomes

Through this project, I gained practical experience in:

- Full Stack Development
- REST API Development
- Frontend-Backend Integration
- Database Connectivity
- React State Management
- CRUD Operations
- Responsive UI Design
- Spring Boot Architecture

---

# 🎯 Future Enhancements

- JWT Authentication
- Transaction History
- Role-Based Access
- Email Notifications
- Cloud Deployment
- Docker Integration
- Payment Gateway Integration
- Admin Dashboard

---
# 👨‍💻 Author

Developed by Hema Sri

GitHub: https://github.com/GURRALA-HEMASRI
LinkedIn: https://www.linkedin.com/in/hemasrigurrala11
