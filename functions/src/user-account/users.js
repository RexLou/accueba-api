const {
  createEmployeeDetails,
  loginAccount,
  updateAccount,
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
  try {
    const data = req.body.data;
    await updateAccount(data).then((val) => {
      response(res, 200, "successfully update an account!", "success");
    });
    response(res, 200, "no account found", "success");
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};
