const { db } = require("../util/admin");

exports.createEmpDoc = async (driverLicense, otherDetails) => {
  await db.collection("EmployeeDocuments").add({
    driverLicense: {
      number: driverLicense.number,
      type: driverLicense.type,
      restriction: driverLicense.restriction,
      imageURL: driverLicense.restriction,
      approvalStatus: "pending",
      timestamp: new Date(),
    },
    sssNumber: otherDetails.sssNumber,
    philHealthNumber: otherDetails.philHealthNumber,
    pagIbigNumber: otherDetails.pagIbigNumber,
    tinNumber: otherDetails.tinNumber,
    employeeID: otherDetails.employeeID,
    employeePosition: otherDetails.employeePosition,
    modOfPayment: otherDetails.modOfPayment,
  });
};

exports.getEmpDoc = async () => {
  const container = [];
  const employeeRef = await db.collection("EmployeeDocuments").get();
  employeeRef.forEach((val) => {
    container.push(val.data());
  });
  return container;
};

exports.deleteDoc = async (id) => {
  await db.collection("EmployeeDocuments").doc(id).delete();
};
exports.updateStatus = async (id, status) => {
  await db
    .collection("EmployeeDocuments")
    .doc(id)
    .set(
      {
        driverLicense: {
          approvalStatus: status,
          timestamp: new Date(),
        },
      },
      { merge: true }
    );
};
