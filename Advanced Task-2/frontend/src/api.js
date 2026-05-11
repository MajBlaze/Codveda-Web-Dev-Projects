const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const registerUser = (payload) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const loginUser = (payload) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const getMe = (token) =>
  request("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getTasks = (token) =>
  request("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const createTask = (token, payload) =>
  request("/tasks", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

export const updateTask = (token, taskId, payload) =>
  request(`/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

export const deleteTask = (token, taskId) =>
  request(`/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
