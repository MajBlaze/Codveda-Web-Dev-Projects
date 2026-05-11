const jwt = require("jsonwebtoken");
const {
  findUserByEmail,
  createUser,
  verifyUserPassword
} = require("../store/dataStore");
const jwtSecret = process.env.JWT_SECRET || "advanced_task_2_dev_secret";

const createToken = (userId) =>
  jwt.sign({ userId }, jwtSecret, { expiresIn: "7d" });

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await findUserByEmail(email.toLowerCase());

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await createUser({
      name: name.trim(),
      email: email.toLowerCase(),
      password
    });

    const token = createToken(user._id);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email.toLowerCase());

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await verifyUserPassword(user, password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

const getMe = async (req, res) => {
  res.json({ user: req.user });
};

module.exports = { register, login, getMe };
