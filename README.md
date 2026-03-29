# Express API – Auth JWT + Refresh Token

## Overview

Backend API built with **Express + TypeScript + Prisma (MySQL)**.

This project implements a **modern authentication system** using:

- JWT access tokens
- Refresh tokens with rotation
- HttpOnly cookies
- Secure architecture (controller / service separation)

---

## Tech Stack

- **Express** → HTTP server
- **TypeScript** → type safety & maintainability
- **Prisma + MySQL** → database & ORM
- **jsonwebtoken** → authentication (JWT)
- **bcrypt** → password hashing
- **Zod** → input validation
- **cookie-parser** → cookie handling
- **cors** → frontend communication
- **ts-node-dev** → dev environment

---

## Architecture

```
src/
  controllers/   → HTTP layer (req / res)
  services/      → business logic
  middlewares/   → auth & error handling
  dto/           → API data contracts
  schemas/       → validation (Zod)
  lib/           → JWT & Prisma
  config/        → global config (cookies)
```

---

## Authentication Flow

### Login

POST /auth/login

- Validate input (Zod)
- Check user credentials (bcrypt)
- Generate:
  - accessToken (15 min)
  - refreshToken (7 days)
- Store refreshToken in DB
- Send tokens via HttpOnly cookies

---

### Refresh Token

POST /auth/refresh

- Read refreshToken from cookie
- Verify JWT + DB existence
- Delete old token (rotation)
- Generate new tokens
- Send new cookies

---

### Logout

POST /auth/logout

- Delete refreshToken from DB
- Clear cookies

---

### Protected Route

GET /api/me

- Middleware verifies accessToken
- Adds `req.user`
- Returns current user

---

## Security Features

- Password hashing with **bcrypt**
- Short-lived **accessToken**
- Long-lived **refreshToken**
- **Refresh token rotation**
- Tokens stored in **HttpOnly cookies**
- Input validation with **Zod**
- Centralized error handling
- No sensitive data exposed (password never returned)

---

## Database (Prisma)

```prisma
model User {
  id       String @id @default(uuid())
  email    String @unique
  name     String?
  password String

  refreshTokens RefreshToken[]
}

model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique @db.VarChar(512)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

---

## Run the Project

### 1. Install dependencies

```
npm install
```

### 2. Configure environment

Create `.env`:

```
DATABASE_URL="mysql://user:password@localhost:3306/apiexpress"
PORT=3000
JWT_SECRET=your_secret_key
```

---

### 3. Setup database

```
npx prisma migrate dev
npx prisma generate
```

---

### 4. Start server

```
npm run dev
```

---

## 🧪 Example Endpoints

| Method | Route           | Description     |
|--------|----------------|-----------------|
| POST   | /auth/register | Create account  |
| POST   | /auth/login    | Login           |
| POST   | /auth/refresh  | Refresh token   |
| POST   | /auth/logout   | Logout          |
| GET    | /api/me        | Current user    |

---

## 🧠 Key Concepts Implemented

- Clean architecture (controller / service separation)
- Token-based authentication
- Refresh token rotation strategy
- Cookie-based auth (secure alternative to localStorage)
- Error handling middleware
- Input validation layer

---

## 🚀 Next Improvements

- Roles & permissions (admin / user)
- Rate limiting (anti brute-force)
- Logging system (pino / winston)
- Unit & integration tests
- Docker setup

---

## 🎯 Conclusion

This project is a **solid foundation for a production-ready backend**:

- Clean code
- Secure authentication
- Scalable architecture
