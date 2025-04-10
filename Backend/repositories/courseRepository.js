const db = require("../config/db");

class CourseRepository {
  static getAllCourses(callback) {
    db.query("SELECT * FROM courses", callback);
  }

  static addCourse(course, callback) {
    const sql =
      "INSERT INTO courses (title, description, category, start_date, end_date, sessions, price, available_spots, languages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        course.title,
        course.description,
        course.category,
        course.startDate,
        course.endDate,
        course.sessions,
        course.price,
        course.availableSpots,
        course.languages,
      ],
      callback
    );
  }

  static deleteCourse(id, callback) {
    db.query("DELETE FROM courses WHERE id = ?", [id], callback);
  }

  static findCourseById(id, callback) {
    db.query("SELECT * FROM courses WHERE id = ?", [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
  static updateCourse(course, callback) {
    const sql = `
      UPDATE courses SET
        title = ?, description = ?, category = ?, start_date = ?, end_date = ?,
        sessions = ?, price = ?, available_spots = ?, languages = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        course.title,
        course.description,
        course.category,
        course.startDate,
        course.endDate,
        course.sessions,
        course.price,
        course.availableSpots,
        course.languages,
        course.id,
      ],
      callback
    );
  }
}

module.exports = CourseRepository;
