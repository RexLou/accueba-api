const {
  createEmployeeDetails,
  loginAccount,
  updateAccount,
  findEmployees,
  findEmployeeById,
} = require("../../repositories/user-repo");

const { response } = require("../../util/response");

exports.register = async (req, res) => {
  try {
    const data = req.body.data;
    await createEmployeeDetails(data).then((val) => {
      response(res, 200, "successfully create an account", "success");
    });
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.login = async (req, res) => {
  try {
    const empID = req.body.empID;
    const password = req.body.password;
    console.log(empID);
    console.log(password);
    const employeeRef = await loginAccount(empID, password);

    if (employeeRef.isAccountExists) {
      response(res, 200, "account exists!", employeeRef.employeeDoc);
      return;
    }
    response(res, 200, "no account found", "success");
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.updateAccount = async (req, res) => {
  const data = req.body.data;
  const id = req.body.id;
  try {
    await updateAccount(id, data);
    response(res, 200, "successfully update an account!", "success");
  } catch (error) {
    if (error.code === 5) {
      return response(res, 400, "no account found", "success");
    }
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.getEmployees = async (req, res) => {
  const output = []; // only needs to return employee id, and name
  const employees = await findEmployees();
  employees.forEach((emp) => {
    output.push({
      id: emp.id,
      name: emp.empFN || emp.name,
      position: emp.employeePosition,
    });
  });
  response(res, 200, `found ${output.length} employees`, output);
};

exports.getEmployeesById = async (req, res) => {
  const id = req.body.id;

  try {
    const findEmployeesResult = await findEmployeeById(id);
    if (!findEmployeesResult.exists) {
      return response(res, 400, "Employee does not exist.");
    }
    response(res, 200, `found employee ${findEmployeesResult.id}`, {
      id: findEmployeesResult.id,
      ...findEmployeesResult.data(),
    });
  } catch (error) {
    return response(res, 400, error.message);
  }
};
