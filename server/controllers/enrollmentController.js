const fs = require("fs");

const enrollCourse = (req, res) => {
  const { userId, courseId } = req.body;

  let enrollments = [];

  try {
    enrollments = JSON.parse(
      fs.readFileSync("./data/enrollments.json", "utf8")
    );
  } catch {
    enrollments = [];
  }

  const alreadyEnrolled = enrollments.find(
    (item) =>
      item.userId == userId &&
      item.courseId == courseId
  );

  if (alreadyEnrolled) {
    return res.status(400).json({
      success: false,
      message: "Already Enrolled",
    });
  }

  enrollments.push({
    id: Date.now(),
    userId,
    courseId,
    progress: 0,
  });

  fs.writeFileSync(
    "./data/enrollments.json",
    JSON.stringify(enrollments, null, 2)
  );

  res.json({
    success: true,
    message: "Enrollment Successful",
  });
};

const getEnrollments = (req, res) => {
  try {
    const enrollments = JSON.parse(
      fs.readFileSync("./data/enrollments.json", "utf8")
    );

    res.json(enrollments);
  } catch (error) {
    res.json([]);
  }
};

const updateProgress = (req, res) => {
  const { id } = req.params;

  let enrollments = JSON.parse(
    fs.readFileSync("./data/enrollments.json", "utf8")
  );

  enrollments = enrollments.map((item) => {
    if (item.id == id) {
      item.progress = Math.min(
        item.progress + 25,
        100
      );
    }

    return item;
  });

  fs.writeFileSync(
    "./data/enrollments.json",
    JSON.stringify(enrollments, null, 2)
  );

  res.json({
    success: true,
    message: "Progress Updated",
  });
};

module.exports = {
  enrollCourse,
  getEnrollments,
  updateProgress,
};