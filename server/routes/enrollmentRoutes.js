const express = require("express");
const router = express.Router();

const {
  enrollCourse,
  getEnrollments,
  updateProgress,
} = require("../controllers/enrollmentController");

router.post("/", enrollCourse);

router.get("/", getEnrollments);

router.put("/progress/:id", updateProgress);

module.exports = router;