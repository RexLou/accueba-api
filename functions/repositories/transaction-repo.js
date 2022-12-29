const { db } = require("../util/admin");

exports.getTransDoc = (transactionNumber) => {
  return db
    .collection("Transactions")
    .where("transactionNumber", "==", transactionNumber)
    .get();
};

exports.createTransDoc = (transactionId, data) => {
  const payload = { ...data, timestamp: new Date() };

  if (payload.employeePosition === "Helper") {
    transactionId = `${transactionId}-H`;
  }
  return Promise.all([
    db.collection("Transactions").doc(transactionId).set(payload),
    db
      .collection("Employee")
      .doc(data.employeeId)
      .collection("Transaction")
      .doc(transactionId)
      .set(payload),
  ]);
};

// exports.deleteTransDoc = async (empId, id) => {
//   await db
//     .collection("Employee")
//     .doc(empId)
//     .collection("Transactions")
//     .delete();
// };

// exports.updateTransDoc = (empId, data) => {
//   return db
//     .collection("Transactions")
//     .where("employeeID", "==", empId)
//     .update(data);
// };
