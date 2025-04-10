const CourseService = require("../services/courseService");
const Course = require("../models/Course");

exports.getCourses = (req, res) => {
  CourseService.getCourses((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

exports.addCourse = (req, res) => {
  const {
    title,
    description,
    category,
    startDate,
    endDate,
    sessions,
    price,
    availableSpots,
    languages,
  } = req.body;

  const course = new Course(
    null,
    title,
    description,
    category,
    startDate,
    endDate,
    sessions,
    price,
    availableSpots,
    languages
  );

  CourseService.createCourse(course, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ message: "Course added successfully!" });
  });
};

exports.deleteCourse = (req, res) => {
  const { id } = req.params;
  CourseService.removeCourse(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Course deleted successfully!" });
  });
};

exports.getCourseById = (req, res) => {
  const { id } = req.params;

  CourseService.getCourseById(id, (err, course) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  });
};

exports.updateCourse = (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    category,
    startDate,
    endDate,
    sessions,
    price,
    availableSpots,
    languages,
  } = req.body;

  const updatedCourse = new Course(
    id,
    title,
    description,
    category,
    startDate,
    endDate,
    sessions,
    price,
    availableSpots,
    languages
  );

  CourseService.updateCourse(updatedCourse, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Course updated successfully!" });
  });
};
