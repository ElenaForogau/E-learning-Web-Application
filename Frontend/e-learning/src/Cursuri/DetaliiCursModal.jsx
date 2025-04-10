// src/Cursuri/DetaliiCursModal.jsx
import React from "react";
import "./DetaliiCursModal.css";

const DetaliiCursModal = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>{course.title}</h2>
        <p>
          <strong>Descriere:</strong> {course.description}
        </p>
        <p>
          <strong>Domeniu:</strong> {course.category}
        </p>
        <p>
          <strong>Perioadă:</strong> {course.start_date} - {course.end_date}
        </p>
        <p>
          <strong>Ședințe:</strong> {course.sessions}
        </p>
        <p>
          <strong>Preț:</strong> ${course.price}
        </p>
        <p>
          <strong>Locuri disponibile:</strong> {course.available_spots}
        </p>
        <p>
          <strong>Limbi:</strong> {course.languages}
        </p>
      </div>
    </div>
  );
};

export default DetaliiCursModal;
