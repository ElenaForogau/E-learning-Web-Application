import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById, updateCourse } from "../utils/ApiFunctions";
import "./AddCourse.css";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchCourse = async () => {
      const result = await getCourseById(id);
      if (result) {
        setCourse({
          title: result.title,
          description: result.description,
          category: result.category,
          startDate: result.start_date,
          endDate: result.end_date,
          sessions: result.sessions,
          price: result.price,
          availableSpots: result.available_spots,
          languages: result.languages,
        });
      } else {
        setErrorMessage("Eroare la încărcarea cursului.");
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const result = await updateCourse(id, course, token);

    if (result) {
      setSuccessMessage("Cursul a fost actualizat cu succes!");
      setTimeout(() => navigate("/cursuri"), 1500);
    } else {
      setErrorMessage("Eroare la actualizarea cursului.");
    }
  };

  return (
    <div className="add-course-container">
      <form className="add-course-form" onSubmit={handleSubmit}>
        <h2>Editează cursul</h2>
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

        <label>Data de început</label>
        <input
          type="date"
          name="startDate"
          value={course.startDate}
          onChange={handleChange}
          required
        />

        <label>Data de sfârșit</label>
        <input
          type="date"
          name="endDate"
          value={course.endDate}
          onChange={handleChange}
          required
        />

        <label>Număr de ședințe</label>
        <input
          name="sessions"
          type="number"
          value={course.sessions}
          onChange={handleChange}
          required
        />

        <label>Preț</label>
        <input
          name="price"
          type="number"
          value={course.price}
          onChange={handleChange}
          required
        />

        <label>Locuri disponibile</label>
        <input
          name="availableSpots"
          type="number"
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
            className="cancel-btn"
            onClick={() => navigate(-1)}
          >
            Renunță
          </button>
          <button type="submit" className="save-btn">
            Salvează
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
