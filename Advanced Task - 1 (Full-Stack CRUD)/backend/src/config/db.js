const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let memoryServer = null;

const connectDB = async () => {
  const defaultUri = "mongodb://127.0.0.1:27017/student_assignment_tracker";
  const mongoUri = process.env.MONGO_URI || defaultUri;

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return;
  } catch (primaryError) {
    console.warn(`Primary MongoDB connection failed: ${primaryError.message}`);
    console.warn("Starting in-memory MongoDB for development...");
  }

  try {
    memoryServer = await MongoMemoryServer.create();
    const memoryUri = memoryServer.getUri("student_assignment_tracker");

    const memoryConn = await mongoose.connect(memoryUri);
    console.log(`In-memory MongoDB connected: ${memoryConn.connection.host}`);
  } catch (memoryError) {
    console.error(`In-memory MongoDB startup failed: ${memoryError.message}`);
    process.exit(1);
  }
};

const stopInMemoryDB = async () => {
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
};

process.on("SIGINT", async () => {
  await stopInMemoryDB();
});

process.on("SIGTERM", async () => {
  await stopInMemoryDB();
});

module.exports = connectDB;
