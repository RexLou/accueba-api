function getCurrentMonth() {
  const date = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${month[date.getMonth()]}${date.getFullYear()}`;
}

function getCurrentDay() {
  const date = new Date();
  return date.getDate();
}

function getCurrentMonthShort() {
  const date = new Date();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${month[date.getMonth()]}${date.getDate()}`;
}

isExistInArray = (arr, value) => {
  let result = false;
  if (arr == null || arr == undefined) {
    return result;
  }
  const filteredArray = arr.filter((val) => val.dateNow == value);

  if (filteredArray.length > 0) {
    result = true;
  }
  return result;
};

isEmptyArray = (arr) => {
  let timeClockArray;
  if (arr.timeClock == null || arr.timeClock == undefined) {
    timeClockArray = [];
  } else {
    timeClockArray = arr.timeClock;
  }
  return timeClockArray;
};
module.exports = {
  getCurrentMonth,
  getCurrentDay,
  isExistInArray,
  getCurrentMonthShort,
  isEmptyArray,
};
