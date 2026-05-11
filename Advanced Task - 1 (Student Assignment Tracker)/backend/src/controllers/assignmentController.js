const Assignment = require("../models/Assignment");

const createAssignment = async (req, res, next) => {
  try {
    const { title, subject, description, dueDate, status, priority } = req.body;

    if (!title || !subject || !dueDate) {
      res.status(400);
      throw new Error("Please add title, subject, and due date.");
    }

    const assignment = await Assignment.create({
      title,
      subject,
      description,
      dueDate,
      status,
      priority,
      owner: req.user._id
    });

    return res.status(201).json(assignment);
  } catch (error) {
    return next(error);
  }
};

const getAssignments = async (req, res, next) => {
  try {
    const { status, priority, search } = req.query;
    const query = { owner: req.user._id };

    if (status && status !== "all") {
      query.status = status;
    }
    if (priority && priority !== "all") {
      query.priority = priority;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } }
      ];
    }

    const assignments = await Assignment.find(query).sort({ dueDate: 1 });
    return res.json(assignments);
  } catch (error) {
    return next(error);
  }
};

const updateAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!assignment) {
      res.status(404);
      throw new Error("Assignment not found.");
    }

    const fields = ["title", "subject", "description", "dueDate", "status", "priority"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        assignment[field] = req.body[field];
      }
    });

    const updated = await assignment.save();
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

const deleteAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!assignment) {
      res.status(404);
      throw new Error("Assignment not found.");
    }

    await assignment.deleteOne();
    return res.json({ message: "Assignment deleted successfully." });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment
};
