class Enrollment {
  constructor(id, studentId, courseId, enrolledAt) {
    this.id = id;
    this.studentId = studentId;
    this.courseId = courseId;
    this.enrolledAt = enrolledAt;
  }
}

module.exports = Enrollment;
