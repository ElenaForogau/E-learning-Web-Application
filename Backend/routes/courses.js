const express = require("express");
const CourseController = require("../controllers/courseController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", CourseController.getCourses);
router.get("/:id", CourseController.getCourseById);
router.post("/add", verifyToken, CourseController.addCourse);
router.put("/:id", verifyToken, CourseController.updateCourse);
router.delete("/:id", verifyToken, CourseController.deleteCourse);

module.exports = router;
