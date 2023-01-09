const { getLatestPayroll } = require("../src/payroll/payroll");

exports.payrollRoute = (app) => {
  app.post("/getLatestPayroll", getLatestPayroll);
};
