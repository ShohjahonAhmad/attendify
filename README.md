# 📘 Attendify --- Automated Attendance System

Attendify is a full-stack automated attendance system designed for
schools, universities, and training centers.\
It enables **instructors** to create classes and attendance sessions,
and allows **students** to check in by scanning dynamically generated QR
codes via the mobile app.

The system consists of three main parts:

-   **Attendify Backend (Express + TypeScript)**
-   **Attendify Web (React.js for instructors)**
-   **Attendify Mobile App (Expo React Native for students)**

## ✨ Features

### 🎓 Instructor (Web App)

-   Create and manage classes
-   Create attendance sessions
-   Generate secure QR codes
-   View live attendance table
-   Track who scanned and when
-   Manage users and authentication

### 📱 Student (Mobile App)

-   Login using secure credentials
-   Scan instructor-generated QR code
-   Auto-check-in with timestamp + class information
-   View personal attendance history *(if implemented)*

### 🖥️ Backend (Node + Express + TypeScript)

-   REST API for web and mobile apps
-   JWT authentication
-   QR session generation & verification
-   MongoDB/PostgreSQL/SQL (depending on Prisma config)
-   Nodemailer for notifications
-   Real-time or polling-based attendance fetching

## 📁 Project Structure

    Attendify/
    │
    ├── attendify        → Backend (Express + TypeScript)
    │
    └── Attendify-frontend
          ├── web        → React web app for instructors
          ├── mobile     → Expo React Native app for students

## 🚀 Tech Stack

### Frontend (Web)

-   React.js + TypeScript
-   Axios
-   Tailwind (if used)
-   Vite / CRA

### Mobile

-   Expo (React Native)
-   Expo Camera / QR Scanner
-   SecureStore for auth tokens

### Backend

-   Node.js + Express.js
-   TypeScript
-   Prisma ORM
-   PostgreSQL / MongoDB / MySQL
-   JWT Authentication
-   Nodemailer

## 🛠️ Installation & Setup

### 1. Clone the repositories

    git clone https://github.com/ShohjahonAhmad/attendify
    git clone https://github.com/ShohjahonAhmad/Attendify-frontend

## 🔧 Environment Variables

### Backend `.env`

    PORT=5000
    DATABASE_URL=your_database_connection_string
    JWT_SECRET=your_jwt_secret_key
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=email_password_or_app_password
    BASE_URL=http://localhost:5000

### Web `.env`

    VITE_BASE_URL=http://localhost:5000

### Mobile `.env`

    EXPO_PUBLIC_API_URL=http://your-local-ip:5000

## ▶️ Running the Backend

    cd attendify
    npm install
    npm run dev

## 🖥️ Running the Web App

    cd Attendify-frontend/web
    npm install
    npm run dev

## 📱 Running the Mobile App

    cd Attendify-frontend/mobile
    npm install
    npx expo start

## 🎯 How Attendify Works

1.  Instructor creates a class\
2.  Instructor starts an attendance session\
3.  System generates a secure QR code\
4.  Students scan the QR using the mobile app\
5.  Backend verifies the session + student identity\
6.  Attendance is saved\
7.  Instructor sees real-time attendance data

## 📄 License

MIT License

## ✉️ Contact

Email: **ahmshohjahon@gmail.com**
