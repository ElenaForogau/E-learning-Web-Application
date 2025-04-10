import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./EnrollmentCalendar.css";
import { getAllEnrollmentDates } from "../utils/ApiFunctions";

const EnrollmentCalendar = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [studentsForDate, setStudentsForDate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");

      const data = await getAllEnrollmentDates(token);
      if (Array.isArray(data)) {
        setEnrollments(data);

        const dates = [
          ...new Set(
            data.map(
              (entry) =>
                new Date(entry.enrollment_date).toISOString().split("T")[0]
            )
          ),
        ];
        setMarkedDates(dates);
      }
    };

    fetchData();
  }, []);

  const handleDateClick = (date) => {
    const selected = date.toISOString().split("T")[0];
    setSelectedDate(selected);

    const students = enrollments
      .filter((e) => {
        const d = new Date(e.enrollment_date).toISOString().split("T")[0];
        return d === selected;
      })
      .map((e) => e.student_name);

    setStudentsForDate(students);
  };

  const tileClassName = ({ date }) => {
    const dateStr = date.toISOString().split("T")[0];
    return markedDates.includes(dateStr) ? "marked-day" : null;
  };

  return (
    <div className="calendar-container">
      <h2>Calendar Înrolări</h2>
      <Calendar onClickDay={handleDateClick} tileClassName={tileClassName} />

      {selectedDate && (
        <div className="students-list">
          <h3>Studenți înrolați pe {selectedDate}:</h3>
          {studentsForDate.length > 0 ? (
            <ul>
              {studentsForDate.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          ) : (
            <p>Niciun student înscris în acea zi.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EnrollmentCalendar;
