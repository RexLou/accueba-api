const { userAccount } = require("./user-account-route");
const { employeeMod } = require("./employee-mod-route");
const { transaction } = require("./transaction-route");
const { attendance } = require("./attendance-route");
const { salaryComputation } = require("./salary-computation-route");

exports.modules = {
  userAccount,
  employeeMod,
  transaction,
  attendance,
  salaryComputation,
};
