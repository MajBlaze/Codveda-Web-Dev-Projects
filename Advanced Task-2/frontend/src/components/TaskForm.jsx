import { useState } from "react";

const TaskForm = ({ onCreate, disabled }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanedTitle = title.trim();
    if (!cleanedTitle) {
      return;
    }
    onCreate(cleanedTitle);
    setTitle("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a task title"
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !title.trim()}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
