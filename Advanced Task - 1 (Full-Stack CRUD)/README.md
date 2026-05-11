# Advanced Task - 1 - Student Assignment Tracker

A simple and practical full-stack app to manage student assignments in one place.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + password hashing (bcryptjs)

## Features

- User registration and login
- JWT-protected routes
- Create assignment
- Read/list assignments
- Update assignment details and status
- Delete assignment
- Filter by status and priority
- Search by assignment title and subject

## Project Structure

```text
Advanced Task - 1 (Full-Stack CRUD)/
  backend/
  frontend/
```

## Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env` using `backend/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student_assignment_tracker
JWT_SECRET=your_jwt_secret_here
```

Run backend:

```bash
npm run dev
```

## Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env` using `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

## Run Both with One Command

From project root:

```bash
npm install
npm run setup
npm run dev
```

If local MongoDB is not running, the app automatically starts an in-memory MongoDB in development mode.

## Keys and Values You Need to Set

- `backend/.env`
- `JWT_SECRET` is required
- `MONGO_URI` is optional

`JWT_SECRET` can be any strong random text, for example:

```env
JWT_SECRET=my_super_secret_key_12345
```

`MONGO_URI` can stay as default. If you use MongoDB Atlas, replace it with your Atlas connection string.

- `frontend/.env`
- `VITE_API_URL` is optional

If you skip it, frontend already uses `http://localhost:5000/api` by default.

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)

### Assignments (all protected)

- `POST /api/assignments`
- `GET /api/assignments`
- `PUT /api/assignments/:id`
- `DELETE /api/assignments/:id`

## Notes for Submission

This project satisfies Level 3 Advanced Task 1 requirements:

- Back-end server with Express
- REST API with CRUD operations
- React front-end connected to back-end API
- MongoDB database integration
