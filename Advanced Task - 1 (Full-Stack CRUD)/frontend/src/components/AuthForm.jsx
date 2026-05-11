import { useState } from "react";

const AuthForm = ({ mode, onSubmit, loading, error, onSwitchMode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <div className="auth-wrap">
      <h1>Student Assignment Tracker</h1>
      <p>Keep your assignments clear, organized, and under control.</p>

      <form className="card form" onSubmit={handleSubmit}>
        <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>

        {mode === "register" && (
          <label>
            Your Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              required
            />
          </label>
        )}

        <label>
          Email Address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            minLength={6}
            required
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>

        <button type="button" className="link-btn" onClick={onSwitchMode}>
          {mode === "login" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
