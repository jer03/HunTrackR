# Full-Stack Job Tracker Application (HunTrackR)

## Personal Project
A production-quality, full-stack **Job Tracker** application built for job seekers to manage, track, and organize their job applications. The app includes features such as secure user authentication, password reset functionality and job application tracking.

---

## Description
This project is a **secure, full-stack job application management system** designed to allow users to track their job applications throughout various stages. The app features modern **user authentication** (JWT, bcrypt, secure reset tokens) and provides functionality for users to register, login, manage job applications and track job stages. The system supports **real-time email-based password reset functionality**.

The backend is a **RESTful API** built with **Node.js and Express.js**, and the frontend is developed using **React.js**, **Vite**, and **Tailwind CSS**. The app uses **PostgreSQL** for persistent data storage and is **Dockerized** for easy deployment. The system is architected for **scalability** and ready for **cloud deployment** (AWS, Render, etc.).

---

## Key Features
- **Complete Full-Stack Authentication Flow**:
  - Register, login, logout, forgot password, and reset password.
  - Stateless JWT authorization with secure HTTP-only tokens.
  
- **Email Reset Flow**:
  - Secure, time-limited reset tokens are used to reset passwords (Gmail SMTP + Nodemailer).
  
- **React Frontend**:
  - Global **AuthContext** for state management.
  - **Dynamic Navbar** and **protected routes** for secure navigation.
  
- **Backend REST API**:
  - Built with **Express.js** and **Node.js**.
  - **Sequelize ORM** with a **PostgreSQL** database (Dockerized).
  
- **User Session Handling**:
  - Protected routes to ensure only authenticated users can access sensitive areas of the app.
  
- **Dockerized**:
  - Docker and Docker Compose for **local development**.
  - PostgreSQL running in a **Docker container**.
  - Ready for **cloud deployment** (AWS, Render, etc.).

- **Modular React Architecture**:
  - Reusable components like **PrivateRoute**, **Navbar**, and **AuthProvider**.
  
- **Environment Variable Management**:
  - Clean management of sensitive configuration using **dotenv**.

---

## Tech Stack

### Frontend:
- **React.js** + **Vite** for fast development and bundling.
- **Tailwind CSS** for utility-first styling.
- **React Router DOM** for client-side routing.
- **Axios** for making HTTP requests (with global interceptors for authentication).

### Backend:
- **Node.js** + **Express.js** for building the REST API.
- **PostgreSQL** (Dockerized) for data persistence.
- **Sequelize ORM** for interacting with the PostgreSQL database.
- **bcryptjs** for securely hashing passwords.
- **jsonwebtoken** (JWT) for authentication.
- **Nodemailer** with Gmail SMTP for sending password reset emails.
- **dotenv** for environment variable management.

### Infrastructure:
- **Docker** + **Docker Compose** for local development.
- **PostgreSQL DB container**.
- Ready for **cloud deployment** (Render, AWS, etc.).

