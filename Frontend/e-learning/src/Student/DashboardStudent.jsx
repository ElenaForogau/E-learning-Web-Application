import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const DashboardStudent = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Salut, bun venit!</h2>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate("/chat")}>
          <h3>Intră în chat</h3>
          <p>Dacă ai întrebări</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/enrolled")}>
          <h3>Cursuri înrolate</h3>
          <p>Vezi lista cursurilor la care ești înscris.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
