const { db } = require("../util/admin");

exports.getTransDoc = async () => {
  const container = [];
  const employeeRef = await db.collection("Transactions").get();
  employeeRef.forEach((val) => {
    container.push(val.data());
  });
  return container;
};

exports.createTransDoc = async (data) => {
  await db.collection("Transactions").add({ ...data });
};

exports.deleteTransDoc = async (id) => {
  await db.collection("Transactions").doc(id).delete();
};
exports.updateTransDoc = async (id, status) => {
  await db.collection("Transactions").doc(id).set(
    {
      status: status,
    },
    { merge: true }
  );
};
