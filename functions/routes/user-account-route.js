const {
  register,
  login,
  updateAccount,
  getEmployees,
  getEmployeesById,
} = require("../src/user-account/users");

exports.userAccount = (app) => {
  app.get("/", async (req, res) => {
    res.send("api is running!");
  });
  app.post("/register", register);
  app.post("/login", login);
  app.post("/updateAccount", updateAccount);
  app.post("/get-employees", getEmployees);
  app.post("/get-employee-by-id", getEmployeesById);
};
