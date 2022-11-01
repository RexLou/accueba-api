const { get } = require("http");
const { db } = require("../util/admin");
const { getCurrentMonth, getCurrentDay } = require("../util/date-util");

exports.createAttendance = async (id) => {
  const currentMonthYear = getCurrentMonth();
  const getCurrDay = getCurrentDay();
  const attendanceMap = {};
  attendanceMap[getCurrDay] = {
    timeIn: null,
    timeOut: null,
  };
  await db
    .collection("Employee")
    .doc(id)
    .collection("Attendance")
    .doc(currentMonthYear)
    .set(attendanceMap, { merge: true });
};

exports.timeInAttendance = async (id) => {
  const currentMonthYear = getCurrentMonth();
  const getCurrDay = getCurrentDay();
  const attendanceMap = {};
  attendanceMap[getCurrDay] = {
    timeIn: new Date(),
  };
  await db
    .collection("Employee")
    .doc(id)
    .collection("Attendance")
    .doc(currentMonthYear)
    .set({}, { merge: true });
};
exports.timeOutAttendance = async (id) => {
  const currentMonthYear = getCurrentMonth();
  const getCurrDay = getCurrentDay();
  const attendanceMap = {};
  attendanceMap[getCurrDay] = {
    timeOut: new Date(),
  };
  await db
    .collection("Employee")
    .doc(id)
    .collection("Attendance")
    .doc(currentMonthYear)
    .set({}, { merge: true });
};

exports.deleteAttendance = async (employeeID) => {
  const currentMonthYear = getCurrentMonth();
  await db
    .collection("Employee")
    .doc(id)
    .collection("Attendance")
    .doc(currentMonthYear)
    .delete();
};

exports.getAttendance = async (id) => {
  const currentMonthYear = getCurrentMonth();
  const employeeRef = await db
    .collection("Employee")
    .doc(id)
    .collection("Attendance")
    .doc(currentMonthYear)
    .get();
  const employeeDoc = employeeRef.data();
  return employeeDoc;
};

exports.isAttendanceDocExists = async (id) => {
  const result = false;
  const currentMonthYear = getCurrentMonth();
  const employeeRef = await db
    .collection("Employee")
    .doc(id)
    .collection("Attendance")
    .doc(currentMonthYear)
    .get();
  const employeeDoc = employeeRef.data();
  if (employeeDoc != null || employeeDoc != undefined) {
    result = true;
  }
  return result;
};
