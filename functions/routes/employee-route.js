const { getEmployees } = require("../src/user-account/employee");

exports.employee = (app) => {
  app.get("/get-employees", getEmployees);
};
