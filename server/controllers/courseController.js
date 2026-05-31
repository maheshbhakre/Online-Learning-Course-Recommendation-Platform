const fs = require("fs");

const getCourses = (req, res) => {
  const courses = JSON.parse(
    fs.readFileSync("./data/courses.json", "utf8")
  );

  res.json(courses);
};

module.exports = {
  getCourses
};