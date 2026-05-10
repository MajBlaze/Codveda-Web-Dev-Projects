import { useEffect, useState } from "react";
import { api, setAuthToken } from "./api";
import AuthForm from "./components/AuthForm";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";
import FilterBar from "./components/FilterBar";

const App = () => {
  const [authMode, setAuthMode] = useState("login");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [pageError, setPageError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all"
  });

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchProfile();
      fetchAssignments();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchAssignments();
    }
  }, [filters.status, filters.priority]);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (error) {
      logout();
    }
  };

  const fetchAssignments = async () => {
    try {
      setPageError("");
      const params = new URLSearchParams();
      if (filters.status !== "all") params.append("status", filters.status);
      if (filters.priority !== "all") params.append("priority", filters.priority);
      if (filters.search.trim()) params.append("search", filters.search.trim());
      const query = params.toString();
      const { data } = await api.get(`/assignments${query ? `?${query}` : ""}`);
      setAssignments(data);
    } catch (error) {
      setPageError(error.response?.data?.message || "Could not load assignments right now.");
    }
  };

  const handleAuthSubmit = async (payload) => {
    try {
      setAuthLoading(true);
      setAuthError("");
      const endpoint = authMode === "login" ? "/auth/login" : "/auth/register";
      const { data } = await api.post(endpoint, payload);

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser({ _id: data._id, name: data.name, email: data.email });
    } catch (error) {
      setAuthError(error.response?.data?.message || "Could not sign you in right now.");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken("");
    setToken("");
    setUser(null);
    setAssignments([]);
    setSelectedAssignment(null);
  };

  const handleAssignmentSubmit = async (payload) => {
    try {
      setFormLoading(true);
      setPageError("");
      if (selectedAssignment) {
        await api.put(`/assignments/${selectedAssignment._id}`, payload);
      } else {
        await api.post("/assignments", payload);
      }
      setSelectedAssignment(null);
      await fetchAssignments();
    } catch (error) {
      setPageError(error.response?.data?.message || "Could not save assignment right now.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this assignment? This action cannot be undone.");
    if (!confirmed) return;

    try {
      await api.delete(`/assignments/${id}`);
      await fetchAssignments();
    } catch (error) {
      setPageError(error.response?.data?.message || "Could not delete assignment right now.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/assignments/${id}`, { status });
      await fetchAssignments();
    } catch (error) {
      setPageError(error.response?.data?.message || "Could not update status right now.");
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchAssignments();
  };

  if (!token) {
    return (
      <AuthForm
        mode={authMode}
        onSubmit={handleAuthSubmit}
        loading={authLoading}
        error={authError}
        onSwitchMode={() => setAuthMode((prev) => (prev === "login" ? "register" : "login"))}
      />
    );
  }

  return (
    <main className="dashboard">
      <header className="top-bar card">
        <div>
          <h1>Assignment Dashboard</h1>
          <p>
            Hi <strong>{user?.name || "Student"}</strong>, here is your assignment planner.
          </p>
        </div>
        <button type="button" className="secondary-btn" onClick={logout}>
          Sign Out
        </button>
      </header>

      {pageError && <p className="error card">{pageError}</p>}

      <section className="grid-two">
        <AssignmentForm
          onSubmit={handleAssignmentSubmit}
          selectedAssignment={selectedAssignment}
          onCancelEdit={() => setSelectedAssignment(null)}
          loading={formLoading}
        />

        <div>
          <form onSubmit={handleSearchSubmit}>
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            <button type="submit" className="search-btn">
              Apply Filters
            </button>
          </form>
        </div>
      </section>

      <section>
        <AssignmentList
          assignments={assignments}
          onEdit={setSelectedAssignment}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </section>
    </main>
  );
};

export default App;
