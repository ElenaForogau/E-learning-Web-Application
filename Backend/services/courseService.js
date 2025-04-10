const CourseRepository = require("../repositories/courseRepository");

class CourseService {
  static getCourses(callback) {
    CourseRepository.getAllCourses(callback);
  }

  static createCourse(course, callback) {
    if (!course.title || !course.description || !course.category) {
      return callback(new Error("All fields are required!"));
    }
    CourseRepository.addCourse(course, callback);
  }

  static removeCourse(id, callback) {
    CourseRepository.deleteCourse(id, callback);
  }

  static getCourseById(id, callback) {
    CourseRepository.findCourseById(id, callback);
  }
  static updateCourse(course, callback) {
    CourseRepository.updateCourse(course, callback);
  }
}

module.exports = CourseService;
