import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Deposit() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid deposit amount");
      return;
    }

    try {
      setLoading(true);

      await api.post("/account/deposit", {
        amount
      });

      setSuccess("Deposit successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (err) {
      setError(err.response?.data?.message || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="glass-card">

        <h1>Deposit Funds</h1>
        <p className="subtitle">Securely add funds to your account</p>

        {error && <div className="message-error">{error}</div>}
        {success && <div className="message-success">{success}</div>}

        <form onSubmit={handleDeposit}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Deposit"}
          </button>
        </form>

        <div className="link-text">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </span>
        </div>

      </div>
    </div>
  );
}

export default Deposit;