import React, { useEffect, useState } from "react";
import { getEnrolledCourses, unenrollFromCourse } from "../utils/ApiFunctions";
import "./EnrolledCourses.css";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolled = async () => {
      const token = sessionStorage.getItem("token");
      const result = await getEnrolledCourses(token);
      if (result) setCourses(result);
      setLoading(false);
    };

    fetchEnrolled();
  }, []);

  const handleUnenroll = async (courseId) => {
    const confirm = window.confirm("Sigur vrei să renunți la acest curs?");
    if (!confirm) return;

    const token = sessionStorage.getItem("token");
    const result = await unenrollFromCourse(courseId, token);
    if (result) {
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
    } else {
      alert("A apărut o eroare la renunțare.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Cursurile tale</h2>
      {loading ? (
        <p>Se încarcă...</p>
      ) : courses.length === 0 ? (
        <p>Nu ești înscris la niciun curs momentan.</p>
      ) : (
        <div className="dashboard-grid">
          {courses.map((course) => (
            <div key={course.id} className="dashboard-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>
                <strong>Perioadă:</strong> {course.start_date} -{" "}
                {course.end_date}
              </p>
              <button
                className="unenroll-btn"
                onClick={() => handleUnenroll(course.id)}
              >
                Renunță la curs
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
