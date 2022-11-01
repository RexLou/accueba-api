const {
  createAttendance,
  timeInAttendance,
  timeOutAttendance,
  deleteAttendance,
  getAttendance,
  isAttendanceDocExists,
} = require("../../repositories/attendance-repos");

const { response } = require("../../util/response");

exports.timeInAttendance = async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    await timeInAttendance(employeeID);
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.timeOutAttendance = async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    await timeOutAttendance(employeeID);
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    await deleteAttendance(employeeID);
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    await getAttendance(employeeID);
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};
