const { getLatestPayroll, getAllPayroll } = require("../src/payroll/payroll");

exports.payrollRoute = (app) => {
  app.post("/getLatestPayroll", getLatestPayroll);
};

exports.allPayrollRoute = (app) => {
  app.post("/getAllPayroll", getAllPayroll);
};
