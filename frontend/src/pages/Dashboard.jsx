import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [balance, setBalance] = useState("0.00");
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    try {
      const response = await api.get("/account/balance");
      setBalance(response.data.balance);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="page-container">
      <div className="glass-card dashboard-card">

        <div className="top-bar">
          <div>
            <h1>FinVault Dashboard</h1>
            <p className="subtitle">Premium digital banking experience</p>
          </div>

          <button className="small-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="balance-card">
          <p>Available Balance</p>
          <div className="balance-amount">
            ₹ {loading ? "Loading..." : balance}
          </div>
        </div>

        <div className="nav-grid">

          <div className="nav-tile" onClick={() => navigate("/deposit")}>
            <h3>Deposit Funds</h3>
            <p>Add money securely to your account</p>
          </div>

          <div className="nav-tile" onClick={() => navigate("/withdraw")}>
            <h3>Withdraw Funds</h3>
            <p>Secure instant withdrawals</p>
          </div>

          <div className="nav-tile" onClick={() => navigate("/transfer")}>
            <h3>Transfer Money</h3>
            <p>Send funds instantly</p>
          </div>

          <div className="nav-tile" onClick={() => navigate("/history")}>
            <h3>Transaction History</h3>
            <p>View complete account activity</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;