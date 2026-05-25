import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!form.email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Enter a valid email address");
      return false;
    }

    if (!form.password.trim()) {
      setError("Password is required");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await api.post("/auth/login", form);

      localStorage.setItem("token", response.data.token);

      setSuccess("Login successful. Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Invalid credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="glass-card">

        <h1>FinVault</h1>
        <p className="subtitle">
          Secure Digital Banking Experience
        </p>

        {error && <div className="message-error">{error}</div>}
        {success && <div className="message-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Authenticating..." : "Login Securely"}
          </button>
        </form>

        <div className="link-text">
          New here? <Link to="/register">Create an account</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;