# Advanced Task - 2: Auth + Task Dashboard

This is a simple full-stack app where users can sign up, log in, and manage their own tasks.

It was built as a clean internship project with practical structure, readable code, and easy setup.

## What This App Does

- Creates user accounts with hashed passwords
- Logs users in with JWT authentication
- Protects private routes using token middleware
- Lets each user create, view, update, and delete only their own tasks

## Tech Stack

- Frontend: React + Vite + React Router
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcryptjs

## Project Structure

```text
Advanced Task - 2 (User Authentication)/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      store/
    .env.example
    package.json
    server.js
  frontend/
    src/
      components/
      context/
      pages/
      api.js
      App.jsx
      main.jsx
      styles.css
    .env.example
    package.json
    vite.config.js
  .gitignore
  package.json
  README.md
```

## Run Locally

1. Install dependencies

```bash
npm install
npm run install:backend
npm run install:frontend
```

2. Set backend env

Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/advanced_task_2
JWT_SECRET=replace_with_a_strong_secret
CLIENT_ORIGIN=http://localhost:5173
```

3. Start everything with one command

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## MongoDB Setup (Windows)

If MongoDB service is installed:

```powershell
net start MongoDB
```

Check service status:

```powershell
Get-Service MongoDB
```

## Notes About Database Mode

- If MongoDB is running, backend connects to MongoDB and data is persistent.
- If MongoDB is unavailable, backend falls back to memory mode so the app still runs.
- In memory mode, data resets when the backend restarts.

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Quick Troubleshooting

- `Failed to fetch`:
  - Make sure `npm run dev` is running.
  - Open frontend on `http://localhost:5173` only.
- `EADDRINUSE` port error:
  - Just run `npm run dev` again. Predev cleanup handles common port conflicts.

## Internship Requirement Mapping

This project satisfies Advanced Task 2:

- User registration and login
- JWT-based authentication
- Password hashing
- Protected backend routes
