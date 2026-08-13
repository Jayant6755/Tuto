# TUTO - Educational Platform

A full-stack web application that connects students and teachers in an interactive learning environment with real-time messaging and collaboration features.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Real-time Communication](#real-time-communication)
- [Contributing](#contributing)

## 🎯 Project Overview

TUTO is an educational platform designed to facilitate seamless interaction between students and teachers. The platform provides:

- **User Authentication**: Secure login and registration for students and teachers
- **Real-time Messaging**: Instant communication between students and teachers
- **Personalized Dashboards**: Dedicated dashboards for students and teachers
- **Subject Browsing**: Explore and discover different subjects and featured teachers
- **Teacher Discovery**: Browse and connect with featured teachers
- **Notification System**: Stay updated with real-time notifications

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS + UI Component Library
- **Real-time Communication**: Socket.io Client
- **UI Components**: Custom components with accessibility features (alerts, avatars, badges, buttons, dialogs, etc.)
- **Routing**: React Router
- **Package Manager**: npm

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Real-time Communication**: Socket.io
- **Database**: Connection pooling configured in Models
- **Authentication**: Middleware-based auth system
- **API**: RESTful endpoints

## 📁 Project Structure

```
TUTO/
├── Backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── server.ts          # Main server entry point
│   │   ├── Controller/        # Business logic controllers
│   │   │   ├── Message.ts
│   │   │   ├── Student.ts
│   │   │   ├── Teacher.ts
│   │   │   └── User.ts
│   │   ├── Middleware/        # Express middlewares
│   │   │   └── authmiddleware.ts
│   │   ├── Models/            # Data models and DB connections
│   │   │   ├── Connection.ts
│   │   │   ├── Message.ts
│   │   │   ├── StudentInfo.ts
│   │   │   ├── TeacherInfo.ts
│   │   │   └── User.ts
│   │   ├── Routes/            # API routes
│   │   │   ├── auth.ts
│   │   │   ├── connection.ts
│   │   │   ├── student.ts
│   │   │   ├── teacher.ts
│   │   │   └── user.ts
│   │   └── socket/            # Socket.io configuration
│   │       └── socket.ts
│   ├── package.json
│   └── tsconfig.json
│
├── Frontend/                   # React frontend with Vite
│   ├── src/
│   │   ├── App.tsx            # Main App component
│   │   ├── main.tsx           # Entry point
│   │   ├── components/
│   │   │   ├── ui/            # Reusable UI components
│   │   │   ├── Dashboard/     # Dashboard components
│   │   │   ├── Hero/          # Landing page sections
│   │   │   ├── Pages/         # Page components
│   │   │   └── Socket/        # Socket.io client setup
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility functions
│   │   └── login/             # Login components
│   ├── public/                # Static assets
│   │   └── Pictures/          # Image assets
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── index.html
│
└── README.md                  # This file
```

## 🚀 Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** (for version control)

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (create a `.env` file):
```
DATABASE_URL=your_database_url
PORT=5000
NODE_ENV=development
```

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (create a `.env` file):
```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## 🎮 Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
cd Backend
npm run dev
# or
npm start
```
The backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend Development Server:**
```bash
cd Frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd Backend
npm run build
npm start
```

**Frontend:**
```bash
cd Frontend
npm run build
```
The build output will be in the `dist/` directory.

## ✨ Features

### Authentication & Authorization
- User registration and login
- Role-based access (Student/Teacher)
- Secure authentication middleware
- Session management

### Dashboard
- **Student Dashboard**: View courses, scheduled classes, and progress
- **Teacher Dashboard**: Manage classes, students, and materials

### Messaging System
- Real-time message exchange between students and teachers
- Message history
- Notification alerts

### Discovery Features
- Browse and search subjects
- Featured teachers showcase
- Teacher profiles and ratings
- Working methodology information

### Real-time Communication
- Socket.io integration for real-time updates
- Live notifications
- Instant messaging

### UI Components
- Responsive design
- Accessibility features (alerts, labels, etc.)
- Toast notifications
- Dialogs and modals
- Form inputs and validation

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout

### User Routes (`/api/user`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `DELETE /profile` - Delete account

### Student Routes (`/api/student`)
- `GET /dashboard` - Student dashboard data
- `GET /connections` - Get student connections
- `POST /connect` - Connect with a teacher

### Teacher Routes (`/api/teacher`)
- `GET /dashboard` - Teacher dashboard data
- `GET /students` - List of students
- `PUT /availability` - Update availability

### Messages Routes (`/api/messages`)
- `GET /` - Get messages
- `POST /send` - Send a message
- `GET /:id` - Get specific message thread

### Connection Routes (`/api/connection`)
- `GET /` - Get all connections
- `POST /create` - Create new connection
- `DELETE /:id` - Remove connection

## 🔌 Real-time Communication

The application uses **Socket.io** for real-time features:

### Socket Events
- `connection` - User connects to server
- `message` - New message received
- `notification` - Notification event
- `user-status` - User online/offline status
- `disconnect` - User disconnects

Configuration is in [Backend/src/socket/socket.ts](Backend/src/socket/socket.ts)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request


