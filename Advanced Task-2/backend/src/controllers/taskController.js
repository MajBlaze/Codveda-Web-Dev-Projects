const mongoose = require("mongoose");
const {
  listTasksByUser,
  createTaskForUser,
  findTaskByIdForUser,
  saveTask,
  deleteTaskByIdForUser
} = require("../store/dataStore");
const runtime = require("../config/runtime");

const getTasks = async (req, res) => {
  try {
    const tasks = await listTasksByUser(req.user._id);
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch tasks" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await createTaskForUser({ title: title.trim(), userId: req.user._id });

    res.status(201).json({
      message: "Task created",
      task
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to create task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    if (runtime.dbMode === "mongo" && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await findTaskByIdForUser({ taskId: id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (typeof title === "string") {
      const cleanedTitle = title.trim();
      if (!cleanedTitle) {
        return res.status(400).json({ message: "Task title cannot be empty" });
      }
      task.title = cleanedTitle;
    }

    if (status) {
      const allowedStatus = ["pending", "completed"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid task status" });
      }
      task.status = status;
    }

    await saveTask(task);

    res.json({
      message: "Task updated",
      task
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to update task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (runtime.dbMode === "mongo" && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await deleteTaskByIdForUser({ taskId: id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete task" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
