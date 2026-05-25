import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Transfer() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Recipient email is required");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid transfer amount");
      return;
    }

    try {
      setLoading(true);

      await api.post("/account/transfer", {
        email,
        amount
      });

      setSuccess("Transfer successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (err) {
      setError(err.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="glass-card">

        <h1>Transfer Money</h1>
        <p className="subtitle">Fast peer-to-peer secure transfer</p>

        {error && <div className="message-error">{error}</div>}
        {success && <div className="message-success">{success}</div>}

        <form onSubmit={handleTransfer}>
          <input
            type="email"
            placeholder="Recipient email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="number"
            placeholder="Transfer amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Transfer"}
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

export default Transfer;