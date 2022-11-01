const { db } = require("../util/admin");

exports.createEmployeeDetails = async (data) => {
  await db
    .collection("Employee")
    .add({ ...data })
    .then((val) => {
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
  if (employeeRef.docs.length != 0) {
    result = true;
  }
  return {
    employeeDoc: employeeRef.docs[0].data(),
    isAccountExists: result,
  };
};

exports.updateAccount = async (data) => {
  await db.collection("Employee").add({ ...data });
};
