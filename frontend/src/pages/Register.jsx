import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
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
    if (!form.fullName.trim()) {
      setError("Full name is required");
      return false;
    }

    if (form.fullName.length < 3) {
      setError("Full name must be at least 3 characters");
      return false;
    }

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

      const response = await api.post("/auth/register", form);

      localStorage.setItem("token", response.data.token);

      setSuccess("Account created successfully. Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1400);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="glass-card">

        <h1>Create FinVault Account</h1>
        <p className="subtitle">
          Premium banking starts here
        </p>

        {error && <div className="message-error">{error}</div>}
        {success && <div className="message-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={form.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Premium Account"}
          </button>
        </form>

        <div className="link-text">
          Already have an account? <Link to="/">Login</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;