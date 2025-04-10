const db = require("../config/db");
const EnrollmentService = require("../services/enrollmentService");

exports.enrollInCourse = (req, res) => {
  const studentId = req.user.id;
  const courseId = req.params.courseId;

  const checkQuery = `
    SELECT * FROM enrollments
    WHERE student_id = ? AND course_id = ?
  `;

  db.query(checkQuery, [studentId, courseId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: "Ești deja înscris la acest curs." });
    }

    const spotCheckQuery = `
      SELECT available_spots FROM courses WHERE id = ?
    `;

    db.query(spotCheckQuery, [courseId], (err, spotResult) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!spotResult.length || spotResult[0].available_spots <= 0) {
        return res
          .status(400)
          .json({ error: "Nu mai sunt locuri disponibile la acest curs." });
      }

      const insertQuery = `
        INSERT INTO enrollments (student_id, course_id)
        VALUES (?, ?)
      `;

      db.query(insertQuery, [studentId, courseId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const updateSpotsQuery = `
          UPDATE courses
          SET available_spots = available_spots - 1
          WHERE id = ?
        `;

        db.query(updateSpotsQuery, [courseId], (err) => {
          if (err) {
            console.error("Eroare la actualizarea locurilor:", err);
          }
          return res
            .status(201)
            .json({ message: "Înscriere realizată cu succes." });
        });
      });
    });
  });
};

exports.getStudentCourses = (req, res) => {
  const studentId = req.user.id;

  EnrollmentService.getStudentEnrollments(studentId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

exports.unenrollFromCourse = (req, res) => {
  const studentId = req.user.id;
  const courseId = req.params.courseId;

  const deleteQuery = `
    DELETE FROM enrollments
    WHERE student_id = ? AND course_id = ?
  `;

  db.query(deleteQuery, [studentId, courseId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Nu ești înscris la acest curs." });
    }

    const updateSpotsQuery = `
      UPDATE courses
      SET available_spots = available_spots + 1
      WHERE id = ?
    `;

    db.query(updateSpotsQuery, [courseId], (err) => {
      if (err) {
        console.error("Eroare la actualizarea locurilor:", err);
      }

      return res.status(200).json({ message: "Ai renunțat la curs." });
    });
  });
};

exports.getEnrollmentsByCourse = (req, res) => {
  const courseId = req.params.courseId;

  const query = `
    SELECT 
      e.enrolled_at AS enrollment_date,
      u.first_name,
      u.last_name
    FROM enrollments e
    JOIN users u ON e.student_id = u.id
    WHERE e.course_id = ?
    ORDER BY e.enrolled_at DESC
  `;

  db.query(query, [courseId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const formatted = results.map((row) => ({
      student_name: `${row.first_name} ${row.last_name}`,
      enrollment_date: row.enrollment_date,
    }));

    res.status(200).json(formatted);
  });
};

exports.getMonthlyStats = (req, res) => {
  const courseId = req.params.courseId;

  const query = `
      SELECT 
        DATE_FORMAT(enrolled_at, '%Y-%m') AS month,
        COUNT(*) AS count
      FROM enrollments
      WHERE course_id = ?
      GROUP BY month
      ORDER BY month ASC
    `;

  db.query(query, [courseId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getEnrollmentsPerCourse = (req, res) => {
  const query = `
    SELECT c.id, c.title, COUNT(e.id) AS students
    FROM courses c
    LEFT JOIN enrollments e ON c.id = e.course_id
    GROUP BY c.id, c.title
    ORDER BY c.title ASC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json(results);
  });
};

exports.getEnrollmentDates = (req, res) => {
  const courseId = req.params.courseId;

  const query = `
    SELECT DISTINCT DATE(enrolled_at) AS enrollment_date
    FROM enrollments
    WHERE course_id = ?
    ORDER BY enrollment_date ASC
  `;

  db.query(query, [courseId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const dates = results.map(
      (row) => new Date(row.enrollment_date).toISOString().split("T")[0]
    );

    res.status(200).json(dates);
  });
};

exports.getAllEnrollmentDates = (req, res) => {
  const query = `
    SELECT 
      DATE(e.enrolled_at) AS enrollment_date,
      CONCAT(u.first_name, ' ', u.last_name) AS student_name
    FROM enrollments e
    JOIN users u ON e.student_id = u.id
    ORDER BY e.enrolled_at ASC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json(results);
  });
};
