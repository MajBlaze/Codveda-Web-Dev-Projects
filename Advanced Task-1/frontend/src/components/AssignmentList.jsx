const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

const AssignmentList = ({ assignments, onEdit, onDelete, onStatusChange }) => {
  if (assignments.length === 0) {
    return (
      <div className="card">
        <p>No assignments yet. Add your first one to get started.</p>
      </div>
    );
  }

  return (
    <div className="list-grid">
      {assignments.map((assignment) => (
        <article className="card assignment-card" key={assignment._id}>
          <div className="between">
            <h3>{assignment.title}</h3>
            <span className={`pill ${assignment.priority}`}>{assignment.priority}</span>
          </div>
          <p className="subject">{assignment.subject}</p>
          <p>{assignment.description || "No description added yet."}</p>
          <p className="meta">Due: {formatDate(assignment.dueDate)}</p>

          <label>
            Status
            <select
              value={assignment.status}
              onChange={(event) => onStatusChange(assignment._id, event.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <div className="row">
            <button type="button" className="secondary-btn" onClick={() => onEdit(assignment)}>
              Edit
            </button>
            <button type="button" className="danger-btn" onClick={() => onDelete(assignment._id)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default AssignmentList;
