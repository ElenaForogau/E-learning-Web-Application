import React, { useState } from "react";
import { addCourse } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import "./AddCourse.css";

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    sessions: "",
    price: "",
    availableSpots: "",
    languages: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const result = await addCourse(course, token);

    if (result) {
      setSuccessMessage("Cursul a fost adăugat cu succes!");
      setCourse({
        title: "",
        description: "",
        category: "",
        startDate: "",
        endDate: "",
        sessions: "",
        price: "",
        availableSpots: "",
        languages: "",
      });
    } else {
      setErrorMessage("A apărut o eroare la adăugarea cursului.");
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <div className="add-course-container">
      <form className="add-course-form" onSubmit={handleSubmit}>
        {successMessage && <p className="success-msg">{successMessage}</p>}
        {errorMessage && <p className="error-msg">{errorMessage}</p>}

        <label>Titlu</label>
        <input
          name="title"
          value={course.title}
          onChange={handleChange}
          required
        />

        <label>Descriere</label>
        <textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          required
        />

        <label>Domeniu</label>
        <input
          name="category"
          value={course.category}
          onChange={handleChange}
          required
        />

        <label>Start date</label>
        <input
          type="date"
          name="startDate"
          value={course.startDate}
          onChange={handleChange}
          required
        />

        <label>End date</label>
        <input
          type="date"
          name="endDate"
          value={course.endDate}
          onChange={handleChange}
          required
        />

        <label>Nr. ședințe</label>
        <input
          name="sessions"
          value={course.sessions}
          onChange={handleChange}
          required
        />

        <label>Preț</label>
        <input
          name="price"
          value={course.price}
          onChange={handleChange}
          required
        />

        <label>Locuri disponibile</label>
        <input
          name="availableSpots"
          value={course.availableSpots}
          onChange={handleChange}
          required
        />

        <label>Limbi disponibile</label>
        <input
          name="languages"
          value={course.languages}
          onChange={handleChange}
          required
        />

        <div className="button-group">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
