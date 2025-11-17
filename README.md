📘 Attendify — Automated Attendance System

Attendify is a full-stack automated attendance system designed for schools, universities, and training centers.
It enables instructors to create classes and attendance sessions, and allows students to check in by scanning dynamically generated QR codes via the mobile app.

The system consists of three main parts:

Attendify Backend (Express + TypeScript)

Attendify Web (React.js for instructors)

Attendify Mobile App (Expo React Native for students)

✨ Features
🎓 Instructor (Web App)

Create and manage classes

Create attendance sessions

Generate secure QR codes

View live attendance table

Track who scanned and when

Manage users and authentication

📱 Student (Mobile App)

Login using secure credentials

Scan instructor-generated QR code

Auto-check-in with timestamp + class information

View personal attendance history (if implemented)

🖥️ Backend (Node + Express + TypeScript)

REST API for web and mobile apps

JWT authentication

QR session generation + verification

MongoDB/PostgreSQL/SQL (depending on your Prisma config)

Nodemailer for notifications (optional)

Real-time or polling-based attendance fetching

📁 Project Structure
Attendify/
│
├── attendify        → Backend (Express + TypeScript)
│     ├── src
│     ├── prisma
│     └── package.json
│
└── Attendify-frontend
      ├── web        → React web app for instructors
      ├── mobile     → Expo React Native app for students
      └── package.json

🚀 Tech Stack
Frontend (Web)

React.js + TypeScript

Axios

Tailwind (if used)

Vite / CRA

Mobile (Students)

Expo (React Native)

Expo Router / Navigation

Expo Camera / QR Scanner

SecureStore for auth tokens

Backend

Node.js + Express.js

TypeScript

Prisma ORM

PostgreSQL / MongoDB / MySQL (depending on your config)

JWT Authentication

Nodemailer (email features)

Zod / Yup (if used for validation)

🛠️ Installation & Setup
1. Clone the repositories
git clone https://github.com/ShohjahonAhmad/attendify
git clone https://github.com/ShohjahonAhmad/Attendify-frontend

🔧 Environment Variables

❗ These are required for backend and frontend to run.
For security reasons, DO NOT commit them to GitHub.

Backend .env example
PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=email_password_or_app_password
BASE_URL=http://localhost:5000

Web App .env example
VITE_BASE_URL=http://localhost:5000

Mobile App .env example
EXPO_PUBLIC_API_URL=http://your-local-ip:5000

▶️ Running the Backend
cd attendify
npm install
npm run dev


Backend will start on:

http://localhost:5000

🖥️ Running the Web App (Instructors)
cd Attendify-frontend/web
npm install
npm run dev


Web app typically runs on:

http://localhost:5173

📱 Running the Mobile App (Students)
cd Attendify-frontend/mobile
npm install
npx expo start


Scan the QR with Expo Go app or run on an emulator.

🔒 Authentication Flow

Both web and mobile use JWT tokens.

Instructor logs in → receives token → stores in local storage/cookie.

Student logs in via mobile app → token stored in SecureStore.

QR session contains encrypted session ID that backend verifies.

🎯 How Attendify Works

Instructor creates a class.

Instructor starts an attendance session.

System generates a QR code containing a secure session token.

Students open the mobile app and scan the QR code.

Backend verifies:

token validity

session status

student identity

Attendance record is stored automatically.

Instructor sees live table in real time.

📊 Screenshots (add later)

You can add screenshots or generated QR codes here.

🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

📄 License

MIT License

✉️ Contact

Created by Shohjahon Ahmad
Email: ahmshohjahon@gmail.com
