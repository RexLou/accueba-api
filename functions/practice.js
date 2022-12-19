const timeClock = [
  {
    dateNow: "Dec1",
    timeIn: new Date("Dec 1 2022, 8:00 am"),
  },
  {
    dateNow: "Dec2",
    timeOut: new Date("Dec 2 2022, 8:00 am"),
    timeIn: new Date("Dec 2 2022, 10:00 am"),
  },
  {
    dateNow: "Dec3",
    timeOut: new Date("Dec 3 2022, 8:00 am"),
    timeIn: new Date("Dec 3 2022, 10:00 am"),
  },
  {
    dateNow: "Dec4",
    leave: "Sick Leave",
    timestamp: new Date("Dec 4, 2022"),
  },
  {
    dateNow: "Dec5",
    leave: "Vacation Leave",
    timestamp: new Date("Dec 5, 2022"),
  },
];

const value = "Dec6";
// !TIMEOUT
if (isExistInArray(timeClock, value)) {
  for (let i = 0; i < timeClock.length; i++) {
    if (timeClock[i].dateNow === value) {
      timeClock[i].timeOut = new Date("Dec 1 2022, 10:00 am");
    }
  }
} else {
  timeClock.push({ timeOut: new Date("Dec 1 2022, 10:00 am"), dateNow: value });
}

console.log(timeClock);

isExistInArray = (arr, value) => {
  let result = false;
  const filteredArray = arr.filter((val) => val.dateNow == value);
  if (filteredArray.length > 0) {
    result = true;
  }
  return result;
};
