const jwt = require("jsonwebtoken");
const { findUserById } = require("../store/dataStore");
const jwtSecret = process.env.JWT_SECRET || "advanced_task_2_dev_secret";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const hasBearerToken = authHeader.startsWith("Bearer ");

    if (!hasBearerToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    const user = await findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { protect };
