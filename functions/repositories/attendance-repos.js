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

exports.getPendingLeaves = async (requestType) => {
  const output = [];
  const getResult = await db.collectionGroup("Attendance").get();
  function getMonthFromString(mon) {
    return new Date(Date.parse(mon + " 1, 2000")).getMonth();
  }

  if (!getResult.empty) {
    getResult.forEach((document) => {
      const dateToday = new Date();
      const id = document.id;
      if (
        id.slice(-4) < dateToday.getFullYear() ||
        getMonthFromString(id.slice(0, -4)) < dateToday.getMonth()
      ) {
        return;
      }
      const timeClock = document.data().timeClock;
      if (!timeClock) return;
      timeClock.forEach((log) => {
        if (log.leave && !log.statusLeave) {
          requestType === log.leave &&
            output.push({
              empId: document.ref.parent.parent.id,
              monthGroup: id,
              date: log.dateNow,
            });
        }
      });
    });
  }
  return output;
};

exports.updateLeaveStatus = async (empId, monthGroup, leaveDate, status) => {
  const docRef = db
    .collection("Employee")
    .doc(empId)
    .collection("Attendance")
    .doc(monthGroup);

  const document = await docRef.get();
  const timeClock = document.data().timeClock;
  const newTimeClock = timeClock.map((log) =>
    log.dateNow === leaveDate ? { ...log, statusLeave: status } : log
  );

  return docRef.update({ timeClock: newTimeClock });
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
