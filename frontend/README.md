# Employee Management System

A full-stack Employee Management System built with modern technologies to manage users, roles, departments, and analytics in a structured way.

## 🌐 Live Demo

- 🔗 Frontend: [https://employee-management-systemdsc.vercel.app/]
- 🔗 Backend API: [Created with Rail application but due to credit exceeding it is now not running]
  
## 🛠️ Tech Stack :-

### 🔹 Frontend
- React (TypeScript)
- Axios
- React Router
- Custom UI Components
- used Inline CSS(but will shift it to Tailwind)

### 🔹 Backend
- NestJS
- Prisma ORM
- PostgreSQL (Neon DB[DATABASE_URL="postgresql://neondb_owner:npg_XiMwY3TW2kre@ep-fancy-art-am0hyzto-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"])
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
- Dynamic responses from backend(but added only manual responses)

### ⚡ Performance & Security
- API rate limiting
- Optimized API calls
- Error handling & validation

---

## 📸 Screenshots

### 🔹 Dashboard
![Dashboard](./screenshots/dashboard.png)

### 🔹 Login Page
![Login](./screenshots/login.png)

### 🔹 Profile Page
![Profile](./screenshots/profile.png)

### 🔹 Users Page
![Users](./screenshots/users.png)

---
🔹 **Backend Setup**
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
🔹 **Frontend Setup**
cd frontend
npm install
npm run dev

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
