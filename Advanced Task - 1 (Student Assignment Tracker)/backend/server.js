const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Student Assignment Tracker API is running." });
});

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/assignments", require("./src/routes/assignmentRoutes"));

app.use((err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "Server Error"
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
