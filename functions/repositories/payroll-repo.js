const { db } = require("../util/admin");

exports.getLatestPayrollRepo = async (id) => {
  const container = [];
  const transactionRef = await db
    .collection("Transactions")
    .where("employeeId", "==", id.toString())
    .orderBy("timestamp", "desc")
    .get();
  const doc = transactionRef.docs[0].data();
  return doc;
};

exports.getAllPayrollRepo = async (id) => {
  const container = [];
  const transactionRef = await db
    .collection("Transactions")
    .where("employeeId", "==", id.toString())
    .orderBy("timestamp", "desc")
    .get();

  transactionRef.forEach((val) => {
    container.push(val.data());
  });
  return container;
};
