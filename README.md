# 🚀 Employee Management System

A full-stack Employee Management System built with modern technologies to manage users, roles, departments, and analytics in a structured way.

---

## 🌐 Live Demo

- 🔗 Frontend: [employee-management-systemdsc.vercel.app]
- 🔗 Backend API: [On Railway application I hosted the application , but its token has used so currently not shifted to premium plan]

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React (TypeScript)
- Axios
- React Router
- Custom UI Components

### 🔹 Backend
- NestJS
- Prisma ORM
- PostgreSQL (Neon DB)
- JWT Authentication

### 🔹 Deployment
- Frontend: Vercel
- Backend: Railway

---

## ✨ Features

### 🔐 Authentication
- Secure Login & Registration
- JWT-based authentication
- Protected routes

### 👤 User Management
- Create Users
- View All Users (Admin only)
- Role-based access control (Admin / Employee)

### 🏢 Department Management
- Assign departments to employees
- Update existing employee departments

### 📊 Dashboard
- Dynamic dashboard with stats
- Admin-only analytics chart
- Role-based UI rendering

### 🧑‍💼 Profile
- View personal profile
- Upload profile avatar (image support)
- Clean UI card design

### 🔍 Search & Pagination
- Search users by name/email
- Backend pagination for scalability

### 🤖 Chatbot (Optional Feature)
- Interactive chatbot UI
- Dynamic responses from backend

### ⚡ Performance & Security
- API rate limiting(currently i have given for limited request 10)
- Optimized API calls
- Error handling & validation

---

## 📸 Screenshots

### 🔹 Dashboard
![Dashboard](./screenshots/dashboard.png)

### 🔹 Login Page
![Login](./screenshots/login.png)

### 🔹 Registration Page
![Login](./screenshots/login.png)

### 🔹 Profile Page
![Profile](./screenshots/myprofile.png)

### 🔹 Users Page
![Users](./screenshots/users.png)

---

## 📂 Project Structure
Employee_Management_System/
│
├── frontend/ # React App
│ ├── components/
│ ├── pages/
│ └── services/
│
├── backend/ # NestJS API
│ ├── src/
│ ├── prisma/
│ └── modules/
│
└── README.md

**🔹 Backend Setup**
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
**🔹 Frontend Setup**
cd frontend
npm install
npm run dev
