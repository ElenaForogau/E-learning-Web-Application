const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const EnrollmentController = require("../controllers/enrollmentController");

router.post(
  "/:courseId/enroll",
  verifyToken,
  EnrollmentController.enrollInCourse
);
router.get(
  "/my-enrollments",
  verifyToken,
  EnrollmentController.getStudentCourses
);
router.delete(
  "/:courseId/unenroll",
  verifyToken,
  EnrollmentController.unenrollFromCourse
);
router.get(
  "/by-course/:courseId",
  verifyToken,
  EnrollmentController.getEnrollmentsByCourse
);
router.get(
  "/:courseId/monthly-stats",
  verifyToken,
  EnrollmentController.getMonthlyStats
);
router.get(
  "/stats/per-course",
  verifyToken,
  EnrollmentController.getEnrollmentsPerCourse
);

router.get(
  "/dates/:courseId",
  verifyToken,
  EnrollmentController.getEnrollmentDates
);
router.get(
  "/all-dates",
  verifyToken,
  EnrollmentController.getAllEnrollmentDates
);

module.exports = router;
