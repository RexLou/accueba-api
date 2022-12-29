const { db } = require("../util/admin");

exports.getTransDoc = async (empId) => {
  const container = [];
  const employeeRef = await db
    .collection("Employee")
    .doc(empId)
    .collection("Transactions")
    .get();

  employeeRef.forEach((val) => {
    container.push(val.data());
  });

  return container;
};

exports.createTransDoc = async (empId, data) => {
  await db
    .collection("Employee")
    .doc(empId)
    .collection("Transactions")
    .add(data);
};

// exports.deleteTransDoc = async (empId, id) => {
//   await db
//     .collection("Employee")
//     .doc(empId)
//     .collection("Transactions")
//     .delete();
// };
exports.updateTransDoc = async (empId, data) => {
  await db
    .collection("Employee")
    .doc(empId)
    .collection("Transactions")
    .update(data);
};
