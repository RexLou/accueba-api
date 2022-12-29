const {
  timeInAttendance,
  timeOutAttendance,
  deleteAttendance,
  getAttendance,
  sickLeaveAttendacnce,
  vacationLeaveAttendacnce,
  getLeaveRequests,
  approveLeaveRequests,
} = require("../src/attendance-leave-monitoring/attendance");

exports.attendance = (app) => {
  app.post("/timeInAttendance", timeInAttendance);
  app.post("/timeOutAttendance", timeOutAttendance);
  app.post("/deleteAttendance", deleteAttendance);
  app.post("/getAttendance", getAttendance);
  app.post("/sickLeaveAttendance", sickLeaveAttendacnce);
  app.post("/vacationLeaveAttendance", vacationLeaveAttendacnce);
  app.post("/get-leave-requests", getLeaveRequests);
  app.post("/approve-leave-request", approveLeaveRequests);
};
