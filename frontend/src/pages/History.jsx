import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function History() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/account/history");
      setTransactions(response.data);
    } catch (err) {
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="page-container">
      <div className="glass-card dashboard-card">

        <div className="top-bar">
          <div>
            <h1>Transaction History</h1>
            <p className="subtitle">Your recent financial activity</p>
          </div>

          <button
            className="small-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>

        {loading ? (
          <div className="message-success">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="message-error">No transactions found</div>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} className="transaction-item">
              <h3>{tx.type}</h3>
              <p>₹ {tx.amount}</p>
              <p>{tx.description}</p>
              <p>{new Date(tx.timestamp).toLocaleString()}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default History;