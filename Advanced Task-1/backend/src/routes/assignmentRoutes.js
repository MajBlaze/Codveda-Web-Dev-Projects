const express = require("express");
const {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment
} = require("../controllers/assignmentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.route("/").post(createAssignment).get(getAssignments);
router.route("/:id").put(updateAssignment).delete(deleteAssignment);

module.exports = router;
