const { salaryComputation } = require("../src/transaction/salary-computation");

exports.salaryComputation = (app) => {
  app.post("/salaryComputation", salaryComputation);
};
