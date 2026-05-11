import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../api";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

const DashboardPage = () => {
  const { token, user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [busy, setBusy] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadTasks = async () => {
    setErrorMessage("");
    try {
      const data = await getTasks(token);
      setTasks(data.tasks);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (title) => {
    setBusy(true);
    setErrorMessage("");
    setStatusMessage("");
    try {
      const data = await createTask(token, { title });
      setTasks((previous) => [data.task, ...previous]);
      setStatusMessage("Task added successfully.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  const handleToggleTask = async (task) => {
    setBusy(true);
    setErrorMessage("");
    setStatusMessage("");
    const nextStatus = task.status === "completed" ? "pending" : "completed";

    try {
      const data = await updateTask(token, task._id, { status: nextStatus });
      setTasks((previous) =>
        previous.map((item) => (item._id === task._id ? data.task : item))
      );
      setStatusMessage("Task updated.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setBusy(true);
    setErrorMessage("");
    setStatusMessage("");
    try {
      await deleteTask(token, taskId);
      setTasks((previous) => previous.filter((item) => item._id !== taskId));
      setStatusMessage("Task removed.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <h1>Task Dashboard</h1>
          <p>Hi {user?.name || "User"}, keep your work organized.</p>
        </div>
        <button type="button" className="secondary" onClick={logout}>
          Logout
        </button>
      </header>

      <TaskForm onCreate={handleCreateTask} disabled={busy} />

      {statusMessage ? <p className="success-text">{statusMessage}</p> : null}
      {errorMessage ? <p className="error-text">{errorMessage}</p> : null}

      <section className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks yet</h3>
            <p>Add your first task above.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              busy={busy}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
