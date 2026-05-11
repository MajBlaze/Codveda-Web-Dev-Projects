import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { token, register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const onChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    if (formData.password.length < 6) {
      setErrorMessage("Password should be at least 6 characters.");
      setSubmitting(false);
      return;
    }

    try {
      await register(formData);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="screen-center">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Start your own task dashboard.</p>

        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={onChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={onChange}
            required
          />

          {errorMessage ? <p className="error-text">{errorMessage}</p> : null}

          <button type="submit" disabled={submitting}>
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="switch-link">
          Already have an account? <Link to="/login">Go to login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
