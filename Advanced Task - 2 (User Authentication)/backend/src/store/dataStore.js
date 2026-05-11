const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Task = require("../models/Task");
const runtime = require("../config/runtime");

const memoryUsers = [];
const memoryTasks = [];

const sanitizeMemoryUser = (user) => {
  const { password, ...rest } = user;
  return rest;
};

const findUserByEmail = async (email) => {
  if (runtime.dbMode === "mongo") {
    return User.findOne({ email });
  }
  return memoryUsers.find((user) => user.email === email) || null;
};

const findUserById = async (userId) => {
  if (runtime.dbMode === "mongo") {
    return User.findById(userId).select("-password");
  }

  const user = memoryUsers.find((item) => item._id === String(userId));
  return user ? sanitizeMemoryUser(user) : null;
};

const createUser = async ({ name, email, password }) => {
  if (runtime.dbMode === "mongo") {
    return User.create({ name, email, password });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    _id: String(Date.now() + Math.floor(Math.random() * 1000)),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };
  memoryUsers.push(user);
  return user;
};

const verifyUserPassword = async (user, inputPassword) => {
  if (runtime.dbMode === "mongo") {
    return user.comparePassword(inputPassword);
  }
  return bcrypt.compare(inputPassword, user.password);
};

const listTasksByUser = async (userId) => {
  if (runtime.dbMode === "mongo") {
    return Task.find({ user: userId }).sort({ createdAt: -1 });
  }

  return memoryTasks
    .filter((task) => task.user === String(userId))
    .sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)));
};

const createTaskForUser = async ({ title, userId }) => {
  if (runtime.dbMode === "mongo") {
    return Task.create({ title, user: userId });
  }

  const task = {
    _id: String(Date.now() + Math.floor(Math.random() * 1000)),
    title,
    status: "pending",
    user: String(userId),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  memoryTasks.push(task);
  return task;
};

const findTaskByIdForUser = async ({ taskId, userId }) => {
  if (runtime.dbMode === "mongo") {
    return Task.findOne({ _id: taskId, user: userId });
  }

  return (
    memoryTasks.find(
      (task) => task._id === String(taskId) && task.user === String(userId)
    ) || null
  );
};

const saveTask = async (task) => {
  if (runtime.dbMode === "mongo") {
    await task.save();
    return task;
  }

  const index = memoryTasks.findIndex((item) => item._id === task._id);
  if (index >= 0) {
    memoryTasks[index] = {
      ...task,
      updatedAt: new Date().toISOString()
    };
  }
  return task;
};

const deleteTaskByIdForUser = async ({ taskId, userId }) => {
  if (runtime.dbMode === "mongo") {
    return Task.findOneAndDelete({ _id: taskId, user: userId });
  }

  const index = memoryTasks.findIndex(
    (task) => task._id === String(taskId) && task.user === String(userId)
  );

  if (index === -1) {
    return null;
  }

  const [deletedTask] = memoryTasks.splice(index, 1);
  return deletedTask;
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  verifyUserPassword,
  listTasksByUser,
  createTaskForUser,
  findTaskByIdForUser,
  saveTask,
  deleteTaskByIdForUser
};
