import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const DashboardProfesor = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Bine ai venit, Profesore!</h2>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate("/add")}>
          <h3>Adaugă un curs</h3>
          <p>Gestionează cursurile pe care le predai.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/calendar-inrolari")}
        >
          <h3>Calendar înrolări</h3>
          <p>Vezi cine s-a înscris la cursurile tale.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/statistici-inrolari")}
        >
          <h3>Statistici</h3>
          <p>Vezi graficul cu înscrierile pe lună.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfesor;
