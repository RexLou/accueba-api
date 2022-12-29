const { findAllEmployees } = require("../../repositories/employee-repos");
const { response } = require("../../util/response");

exports.getEmployees = async (req, res) => {
  const employees = await findAllEmployees();
  response(res, 200, `found ${employees.length} employees`, employees);
};
