import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Cursuri.css";
import {
  getCourses,
  deleteCourse,
  enrollInCourse,
} from "../utils/ApiFunctions";
import { useAuth } from "../Auth/AuthProvider";
import DetaliiCursModal from "./DetaliiCursModal";

const Cursuri = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search")?.toLowerCase() || "";

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [domain, setDomain] = useState("Toate");
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showOnlyLocalLanguage, setShowOnlyLocalLanguage] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const courses = await getCourses();
      if (courses) {
        setAllCourses(courses);
        setFilteredCourses(courses);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = allCourses;

    if (searchTerm) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchTerm)
      );
    }

    if (domain !== "Toate") {
      filtered = filtered.filter((course) => course.category === domain);
    }

    if (startDate && endDate) {
      filtered = filtered.filter((course) => {
        const courseStart = new Date(course.start_date);
        const courseEnd = new Date(course.end_date);
        return courseStart >= startDate && courseEnd <= endDate;
      });
    }

    const preferredLanguage = localStorage.getItem("preferredLanguage");
    if (preferredLanguage) {
      if (showOnlyLocalLanguage) {
        filtered = filtered.filter((c) =>
          c.languages.toLowerCase().includes(preferredLanguage.toLowerCase())
        );
      } else {
        filtered = [
          ...filtered.filter((c) =>
            c.languages.toLowerCase().includes(preferredLanguage.toLowerCase())
          ),
          ...filtered.filter(
            (c) =>
              !c.languages
                .toLowerCase()
                .includes(preferredLanguage.toLowerCase())
          ),
        ];
      }
    }

    setFilteredCourses(filtered);
  }, [
    allCourses,
    startDate,
    endDate,
    domain,
    searchTerm,
    showOnlyLocalLanguage,
  ]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Ești sigur că vrei să ștergi acest curs?");
    if (!confirm) return;

    const token = sessionStorage.getItem("token");
    const result = await deleteCourse(id, token);

    if (result) {
      setAllCourses((prev) => prev.filter((course) => course.id !== id));
    } else {
      alert("Eroare la ștergerea cursului.");
    }
  };

  const handleEnroll = async (courseId) => {
    if (loadingEnroll) return;
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoadingEnroll(true);
    const result = await enrollInCourse(courseId, token);
    setLoadingEnroll(false);

    if (result?.message) {
      alert(result.message);
    } else {
      alert("A apărut o eroare la înscriere.");
    }
  };

  return (
    <div className="courses-container">
      <h2>Cursuri disponibile</h2>

      <div className="filters">
        <div>
          <label>Perioadă:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End date"
          />
        </div>

        <div>
          <label>Domeniu:</label>
          <select value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option value="Toate">Toate</option>
            <option value="IT">IT</option>
            <option value="Limbi">Limbi</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <button
          onClick={() => setShowOnlyLocalLanguage((prev) => !prev)}
          className="language-toggle-btn"
        >
          {showOnlyLocalLanguage
            ? "Afișează toate cursurile"
            : "Afișează cursurile în limba zonei tale"}
        </button>

        {showOnlyLocalLanguage && (
          <p style={{ marginTop: "8px", fontStyle: "italic" }}>
            Cursuri afișate în limba:{" "}
            <strong>{localStorage.getItem("preferredLanguage")}</strong>
          </p>
        )}
      </div>

      <div className="courses-list">
        {filteredCourses.length === 0 ? (
          <p>Nu există cursuri care să corespundă filtrelor.</p>
        ) : (
          filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>
                <strong>Domeniu:</strong> {course.category}
              </p>
              <p>
                <strong>Perioadă:</strong> {course.start_date} -{" "}
                {course.end_date}
              </p>
              <p>
                <strong>Limbă:</strong> {course.languages}
              </p>
              <p>
                <strong>Locuri disponibile:</strong>{" "}
                {course.available_spots > 0
                  ? course.available_spots
                  : "Indisponibil"}
              </p>

              {user?.role === "profesor" && (
                <div className="course-actions">
                  <button
                    onClick={() => navigate(`/edit/${course.id}`)}
                    className="edit-btn"
                  >
                    Editează
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="delete-btn"
                  >
                    Șterge
                  </button>
                </div>
              )}

              {user?.role === "student" && (
                <button
                  className="enroll-btn"
                  onClick={() => handleEnroll(course.id)}
                  disabled={loadingEnroll || course.available_spots <= 0}
                >
                  {course.available_spots <= 0
                    ? "Locuri epuizate"
                    : loadingEnroll
                    ? "Se înrolează..."
                    : "Înscrie-te"}
                </button>
              )}

              <button
                className="details-btn"
                onClick={() => setSelectedCourse(course)}
              >
                Vezi detalii
              </button>
            </div>
          ))
        )}
      </div>

      {selectedCourse && (
        <DetaliiCursModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default Cursuri;
