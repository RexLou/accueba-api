const {
  createAttendance,
  timeInAttendance,
  timeOutAttendance,
  deleteAttendance,
  getAttendance,
  isAttendanceDocExists,
  sickLeaveAttendance,
  vacationLeaveAttendance,
  getPendingLeaves,
  approveLeave,
  updateLeaveStatus,
} = require("../../repositories/attendance-repos");

const { response } = require("../../util/response");

exports.timeInAttendance = async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    console.log(employeeID);
    const attendanceContainer = await getAttendance(employeeID);

    await timeInAttendance(employeeID, attendanceContainer).then((val) => {
      response(res, 200, "successfully time-out", "success");
    });
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.timeOutAttendance = async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    const attendanceContainer = await getAttendance(employeeID);

    await timeOutAttendance(employeeID, attendanceContainer).then((val) => {
      response(res, 200, "successfully time-out", "success");
    });
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};
exports.sickLeaveAttendacnce = async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    const attendanceContainer = await getAttendance(employeeID);

    await sickLeaveAttendance(employeeID, attendanceContainer).then((val) => {
      response(res, 200, "successfully time-out", "success");
    });
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};
exports.vacationLeaveAttendacnce = async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    const attendanceContainer = await getAttendance(employeeID);

    await vacationLeaveAttendance(employeeID, attendanceContainer).then(
      (val) => {
        response(res, 200, "successfully time-out", "success");
      }
    );
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
    await getAttendance(employeeID).then((val) => {
      console.log(val);
      response(res, 400, "success", val);
    });
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.getLeaveRequests = async (req, res) => {
  const requestType = req.body.requestType;
  const leaves = await getPendingLeaves(requestType);

  response(res, 200, `found ${requestType}/s`, leaves);
};

exports.approveLeaveRequests = async (req, res) => {
  const { employeeID, monthGroup, leaveDate, status } = req.body;
  try {
    await updateLeaveStatus(employeeID, monthGroup, leaveDate, status);
    response(res, 200, "Update success");
  } catch (error) {
    response(res, 400, error.message);
  }
};
