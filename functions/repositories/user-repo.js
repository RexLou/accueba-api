const { db } = require("../util/admin");
const { createAttendance } = require("./attendance-repos");
exports.createEmployeeDetails = async (data) => {
  await db
    .collection("Employee")
    .add({ ...data })
    .then((val) => {
      createAttendance(val.id);
      res.send({ status: 200, message: "success" });
    });
};

exports.loginAccount = async (userID, password) => {
  let result = false;
  const employeeRef = await db
    .collection("Employee")
    .where("empID", "==", userID)
    .where("empPassword", "==", password)
    .get();
  let employeeResultData = {};
  console.log(employeeRef.docs.length);
  if (employeeRef.docs.length != 0) {
    result = true;
  }
  employeeResultData = {
    ...employeeRef.docs[0]?.data(),
    id: employeeRef.docs[0].id,
  };

  return {
    employeeDoc: employeeResultData,
    isAccountExists: result,
  };
};

exports.updateAccount = async (data) => {
  await db.collection("Employee").add({ ...data });
};
