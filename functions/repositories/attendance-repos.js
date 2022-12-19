const { get } = require("http");
const { db } = require("../util/admin");
const {
  getCurrentMonth,
  getCurrentDay,
  isExistInArray,
  getCurrentMonthShort,
  isEmptyArray,
} = require("../util/date-util");

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

exports.timeInAttendance = async (id, attendanceContainer) => {
  const currentMonthYear = getCurrentMonth();
  const getCurrentMonthShortData = getCurrentMonthShort();

  const timeClockArray = isEmptyArray(attendanceContainer);

  if (isExistInArray(timeClockArray, getCurrentMonthShortData)) {
    for (let i = 0; i < timeClockArray.length; i++) {
      if (timeClockArray[i].dateNow === getCurrentMonthShortData) {
        timeClockArray[i].timeIn = new Date();
      }
    }
  } else {
    timeClockArray.push({
      timeIn: new Date(),
      dateNow: getCurrentMonthShortData,
    });
  }

  await db
    .collection("Employee")
    .doc(id)
    .collection("Attendance")
    .doc(currentMonthYear)
    .set({ timeClock: timeClockArray }, { merge: true });
};
exports.timeOutAttendance = async (id, attendanceContainer) => {
  const currentMonthYear = getCurrentMonth();
  const getCurrentMonthShortData = getCurrentMonthShort();

  const timeClockArray = isEmptyArray(attendanceContainer);

  if (isExistInArray(timeClockArray, getCurrentMonthShortData)) {
    for (let i = 0; i < timeClockArray.length; i++) {
      if (timeClockArray[i].dateNow === getCurrentMonthShortData) {
        timeClockArray[i].timeOut = new Date();
      }
    }
  } else {
    timeClockArray.push({
      timeOut: new Date(),
      dateNow: getCurrentMonthShortData,
    });
  }

  await db
    .collection("Employee")
    .doc(id)
    .collection("Attendance")
    .doc(currentMonthYear)
    .set({ timeClock: timeClockArray }, { merge: true });
};

exports.sickLeaveAttendance = async (id, attendanceContainer) => {
  const currentMonthYear = getCurrentMonth();
  const getCurrentMonthShortData = getCurrentMonthShort();

  const timeClockArray = isEmptyArray(attendanceContainer);

  if (isExistInArray(timeClockArray, getCurrentMonthShortData)) {
    for (let i = 0; i < timeClockArray.length; i++) {
      if (timeClockArray[i].dateNow === getCurrentMonthShortData) {
        timeClockArray[i].timeStamp = new Date();
        timeClockArray[i].leave = "Sick Leave";
      }
    }
  } else {
    timeClockArray.push({
      timeStamp: new Date(),
      leave: "Sick Leave",
      dateNow: getCurrentMonthShortData,
    });
  }

  await db
    .collection("Employee")
    .doc(id)
    .collection("Attendance")
    .doc(currentMonthYear)
    .set({ timeClock: timeClockArray }, { merge: true });
};

exports.vacationLeaveAttendance = async (id, attendanceContainer) => {
  const currentMonthYear = getCurrentMonth();
  const getCurrentMonthShortData = getCurrentMonthShort();

  const timeClockArray = isEmptyArray(attendanceContainer);

  if (isExistInArray(timeClockArray, getCurrentMonthShortData)) {
    for (let i = 0; i < timeClockArray.length; i++) {
      if (timeClockArray[i].dateNow === getCurrentMonthShortData) {
        timeClockArray[i].timeStamp = new Date();
        timeClockArray[i].leave = "Vacation Leave";
      }
    }
  } else {
    timeClockArray.push({
      timeStamp: new Date(),
      leave: "Vacation Leave",
      dateNow: getCurrentMonthShortData,
    });
  }

  await db
    .collection("Employee")
    .doc(id)
    .collection("Attendance")
    .doc(currentMonthYear)
    .set({ timeClock: timeClockArray }, { merge: true });
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
