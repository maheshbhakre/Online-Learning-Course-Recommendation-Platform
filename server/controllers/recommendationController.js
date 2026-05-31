const fs = require("fs");

const getRecommendations = (req, res) => {

  const courses = JSON.parse(
    fs.readFileSync("./data/courses.json", "utf8")
  );

  const recommended = courses.filter(
    (course) =>
      course.category === "AI" ||
      course.category === "Data Science"
  );

  res.json(recommended);
};

module.exports = {
  getRecommendations
};