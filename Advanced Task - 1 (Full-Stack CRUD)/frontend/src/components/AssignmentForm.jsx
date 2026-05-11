import { useEffect, useState } from "react";

const defaultForm = {
  title: "",
  subject: "",
  description: "",
  dueDate: "",
  status: "pending",
  priority: "medium"
};

const AssignmentForm = ({ onSubmit, selectedAssignment, onCancelEdit, loading }) => {
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (selectedAssignment) {
      setFormData({
        title: selectedAssignment.title || "",
        subject: selectedAssignment.subject || "",
        description: selectedAssignment.description || "",
        dueDate: selectedAssignment.dueDate
          ? new Date(selectedAssignment.dueDate).toISOString().split("T")[0]
          : "",
        status: selectedAssignment.status || "pending",
        priority: selectedAssignment.priority || "medium"
      });
    } else {
      setFormData(defaultForm);
    }
  }, [selectedAssignment]);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{selectedAssignment ? "Update Assignment" : "Add Assignment"}</h2>

      <label>
        Assignment Title
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter assignment title"
          required
        />
      </label>

      <label>
        Subject
        <input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Enter subject name"
          required
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Enter assignment description"
        />
      </label>

      <label>
        Due Date
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </label>

      <div className="inline-grid">
        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label>
          Priority
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      <div className="row">
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : selectedAssignment ? "Save Changes" : "Create Assignment"}
        </button>
        {selectedAssignment && (
          <button type="button" className="secondary-btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AssignmentForm;
