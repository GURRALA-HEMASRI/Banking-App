import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Withdraw() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid withdrawal amount");
      return;
    }

    try {
      setLoading(true);

      await api.post("/account/withdraw", {
        amount
      });

      setSuccess("Withdrawal successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (err) {
      setError(err.response?.data?.message || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="glass-card">

        <h1>Withdraw Funds</h1>
        <p className="subtitle">Secure instant withdrawals</p>

        {error && <div className="message-error">{error}</div>}
        {success && <div className="message-success">{success}</div>}

        <form onSubmit={handleWithdraw}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Withdraw"}
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

export default Withdraw;