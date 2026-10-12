
# LMS Secure Authentication System

## Project Overview
A secure authentication system for a Learning Management System (LMS) built using Node.js, Express, TypeScript, and MySQL.

## Features
- User registration with password hashing using bcrypt
- User login with JSON Web Tokens (JWT)
- Protected routes using JWT authentication middleware
- Role-Based Access Control (RBAC)
- Student, Instructor, and Admin roles
- Session-based authentication using Passport Local Strategy
- Logout using Express Session
- Centralized error handling

## Technologies Used
- Node.js
- Express.js
- TypeScript
- MySQL
- mysql2
- bcryptjs
- jsonwebtoken
- Passport.js
- express-session
- Postman

## Project Structure
src/
  config/
  controllers/
  middleware/
  models/
  passport/
  routes/
  app.ts
  server.ts

## Installation

1. Install dependencies:

   npm install

2. Configure environment variables in `.env`.

3. Create the required MySQL database and users table.

4. Start the development server:

   npm run dev

The server runs at http://localhost:5000.

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/register | Register a user |
| POST | /api/auth/login | Login and receive JWT |
| POST | /api/auth/session-login | Session-based login |
| POST | /api/auth/logout | Logout of session |
| GET | /api/profile | Access protected profile |
| GET | /api/roles/student | Student-accessible route |
| GET | /api/roles/instructor | Instructor-accessible route |
| GET | /api/roles/admin | Admin-only route |

## Security
- Passwords are hashed before storage.
- JWT tokens are verified by authentication middleware.
- Role-based middleware restricts access.
- Environment variables are used for secrets.

## Testing
API endpoints can be tested using Postman with JSON request bodies and Bearer tokens where required.

## Future Improvements
- Google OAuth login
- Password reset functionality
- Automated unit and integration tests
