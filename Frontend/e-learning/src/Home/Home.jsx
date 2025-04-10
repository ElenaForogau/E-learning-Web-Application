import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../utils/ApiFunctions";
import "./Home.css";
import UserLocation from "../UserLocation";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const allCourses = await getCourses();
      if (allCourses && allCourses.length > 0) {
        const topThree = allCourses.slice(0, 3);
        setCourses(topThree);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="home-container">
      <header className="home-hero">
        <h1>Bine ai venit!</h1>
        <p>Descoperă cursurile noastre și începe să înveți astăzi!</p>

        {}
        <UserLocation />
      </header>

      <section className="home-highlight">
        <h2>Top 3 Cursuri</h2>
        <div className="card-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card-preview">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button
                className="details-btn"
                onClick={() => {
                  if (user) {
                    navigate("/cursuri");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Vezi detalii
              </button>
            </div>
          ))}
        </div>
      </section>

      {!user && (
        <div className="home-buttons">
          <button className="home-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="home-btn dark"
            onClick={() => navigate("/cursuri")}
          >
            Cursuri
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
