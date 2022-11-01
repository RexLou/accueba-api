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

module.exports = { getCurrentMonth, getCurrentDay };
