const { db } = require("../util/admin");
const { createAttendance } = require("./attendance-repos");
const collectionRef = db.collection("Employee");

exports.createEmployeeDetails = async (data) => {
  await db
    .collection("Employee")
    .add({ ...data })
    .then((val) => {
      createAttendance(val.id);
      res.send({ status: 200, message: "success" });
    });
};

exports.findEmployees = async () => {
  const output = [];
  const employees = await collectionRef.get();
  if (!employees.empty) {
    employees.forEach((emp) => {
      output.push({ ...emp.data(), id: emp.id });
    });
  }
  return output;
};

exports.findEmployeeById = (id) => {
  return collectionRef.doc(id).get();
};

exports.findEmployeeByEmpId = async (empId) => {
  const getResult = await db
    .collection("Employee")
    .where("empID", "==", Number(empId))
    .get();
  if (getResult.empty) return {};
  return {
    id: getResult.docs[0].id,
    ...getResult.docs[0].data(),
  };
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

exports.updateAccount = (empDocId, data) => {
  return db
    .collection("Employee")
    .doc(empDocId)
    .update({ ...data });
};
