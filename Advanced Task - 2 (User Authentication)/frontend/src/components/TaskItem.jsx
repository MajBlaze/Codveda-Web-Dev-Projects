const TaskItem = ({ task, onToggle, onDelete, busy }) => {
  const isCompleted = task.status === "completed";

  return (
    <div className={`task-item ${isCompleted ? "done" : ""}`}>
      <div className="task-text">
        <h4>{task.title}</h4>
        <p>{isCompleted ? "Completed" : "Pending"}</p>
      </div>
      <div className="task-actions">
        <button
          type="button"
          onClick={() => onToggle(task)}
          disabled={busy}
          className="secondary"
        >
          {isCompleted ? "Mark Pending" : "Mark Done"}
        </button>
        <button
          type="button"
          onClick={() => onDelete(task._id)}
          disabled={busy}
          className="danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
