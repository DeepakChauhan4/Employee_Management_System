# 🚀 Employee Management System
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
# Employee Management System Application:

A full-stack Employee Management System built with modern technologies to manage users, roles, departments, and analytics in a structured way.

---

## 🌐 Live Demo

- 🔗 Frontend: [employee-management-systemdsc.vercel.app](https://employee-management-systemdsc.vercel.app)
- 🔗 Backend API: [Hosted on Railway (token expired, upgrade planned)]

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React (TypeScript)
- Vite
- Axios
- React Router
- Tailwind CSS / Custom Styles
- React Context API

### 🔹 Backend
- NestJS
- Prisma ORM
- PostgreSQL (Neon DB)
- JWT Authentication
- Class Validator

### 🔹 Deployment
- Frontend: Vercel
- Backend: Railway

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure Login & Registration
- JWT-based authentication
- Role-based access control (Admin/Employee)
- Protected routes & API endpoints

### 👥 User Management (Admin)
- CRUD operations for users
- View all users with pagination
- Search by name/email
- Assign departments & roles

### 👤 Profile Management
- Personal profile view/edit
- Avatar upload with preview
- Department & role display

### 📊 Admin Dashboard
- Real-time statistics cards
- Interactive analytics charts
- Role-specific dashboard views

### 🏢 Department System
- Department assignment
- Filter users by department

### 🔍 Advanced Search & Filter
- Real-time search
- Server-side pagination
- Responsive table design

### 💬 Interactive ChatBot
- AI-like conversation interface
- Backend-powered responses

### ⚡ Performance & Security
- API rate limiting
- Input validation & sanitization
- Error handling with user-friendly messages
- Image upload optimization

---

## 📸 Screenshots

| Dashboard | Login | Register | Profile | Users | AdminDashboard | AdminUsers
| --- | --- | --- | --- | --- |
| ![Dashboard](./screenshots/admindashboard.png.png) | ![Login](./screenshots/login.png.png) | ![Register](./screenshots/register.png.png) | ![Profile](./screenshots/profileedit.png.png) | ![Users](./screenshots/adminusers.png.png) | ![AdminDashboard](./screenshots/admindashboard.png.png)|  ![AdminUsers](./screenshots/adminusers.png.png)


---

## 📁 Project Structure

```
MyInternship-Project/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── user/           # User management
│   │   ├── chat/           # Chatbot API
│   │   ├── prisma/         # Database service
│   │   └── common/         # Guards, decorators
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── frontend/               # React + Vite App
│   ├── src/
│   │   ├── components/     # Reusable UI
│   │   ├── pages/          # Route components
│   │   ├── services/       # API calls
│   │   ├── hooks/          # Custom hooks
│   │   └── context/        # Auth context
│   ├── public/
│   └── package.json
│
├── screenshots/
└── README.md
```

## 🚀 Quick Start

### Backend (NestJS + Prisma)
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```
**API Server: http://localhost:3000**

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
**Frontend: http://localhost:5173**

### Database Setup
1. Create PostgreSQL database (Neon/Supabase)
2. Update `DATABASE_URL` in backend/.env
3. Run Prisma migrations

## 🔧 Environment Variables

**Backend (.env):**
```
DATABASE_URL="postgresql://user:pass@host:port/db"
FRONTEND_URL="http://localhost:5173"(running on vite@latest default port then deployed it on vercel )
```

**Frontend (.env):**
```
VITE_API_URL="http://localhost:3000"
```

---

## 🛠️ Development Scripts

```bash
# Backend
npm run start:dev     # Development with hot reload
npm run build         # Production build
npm run start:prod    # Production server
npx prisma studio     # Database GUI

# Frontend
npm run dev           # Development server
npm run build         # Production build
npm run preview       # Local production preview
```

## 📦 Production Deployment

✅ **Frontend**: Vercel (automatic from GitHub)
✅ **Backend**: Railway (with Railway CLI or dashboard
