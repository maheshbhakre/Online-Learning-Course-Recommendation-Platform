const fs = require("fs");

const register = (req, res) => {
  const { name, email, password } = req.body;

  let users = [];

  try {
    users = JSON.parse(
      fs.readFileSync("./data/users.json")
    );
  } catch {
    users = [];
  }

  users.push({
    id: Date.now(),
    name,
    email,
    password,
  });

  fs.writeFileSync(
    "./data/users.json",
    JSON.stringify(users, null, 2)
  );

  res.json({
    success: true,
    message: "User Registered",
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  let users = [];

  try {
    users = JSON.parse(
      fs.readFileSync("./data/users.json")
    );
  } catch {
    users = [];
  }

  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  res.json({
    success: true,
    token: "demo-token",
    user,
  });
};

module.exports = {
  register,
  login,
};