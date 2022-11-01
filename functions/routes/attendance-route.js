const {
  timeInAttendance,
  timeOutAttendance,
  deleteAttendance,
  getAttendance,
} = require("../src/attendance-leave-monitoring/attendance");

exports.attendance = (app) => {
  app.post("/timeInAttendance", timeInAttendance);
  app.get("/timeOutAttendance", timeOutAttendance);
  app.post("/deleteAttendance", deleteAttendance);
  app.post("/getAttendance", getAttendance);
};
