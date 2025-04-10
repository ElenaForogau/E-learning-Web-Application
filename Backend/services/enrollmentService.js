const EnrollmentRepository = require("../repositories/enrollmentRepository");

class EnrollmentService {
  static enroll(studentId, courseId, callback) {
    EnrollmentRepository.enrollStudent(studentId, courseId, callback);
  }

  static getStudentEnrollments(studentId, callback) {
    EnrollmentRepository.getEnrollmentsByStudent(studentId, callback);
  }
}

module.exports = EnrollmentService;
