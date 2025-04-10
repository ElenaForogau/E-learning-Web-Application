const db = require("../config/db");

class EnrollmentRepository {
  static enrollStudent(studentId, courseId, callback) {
    const sql = "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)";
    db.query(sql, [studentId, courseId], callback);
  }

  static getEnrollmentsByStudent(studentId, callback) {
    const sql = `
      SELECT courses.* FROM courses
      JOIN enrollments ON courses.id = enrollments.course_id
      WHERE enrollments.student_id = ?
    `;
    db.query(sql, [studentId], callback);
  }
}

module.exports = EnrollmentRepository;
