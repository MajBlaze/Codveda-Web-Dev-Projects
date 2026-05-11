const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS blocked for this origin"));
    }
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Server is healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: error.message || "Internal server error"
  });
});

module.exports = app;
