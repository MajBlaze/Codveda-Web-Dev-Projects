const mongoose = require("mongoose");
const runtime = require("./runtime");

const connectDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;

  try {
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }

    const connection = await mongoose.connect(mongoUri);
    runtime.dbMode = "mongo";
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    runtime.dbMode = "memory";
    console.log("MongoDB unavailable, running in memory mode");
  }
};

module.exports = connectDatabase;
