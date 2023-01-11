const { db } = require("../util/admin");
const { findEmployeeByEmpId } = require("./user-repo");

exports.getAllTransDoc = () => {
  return db.collection("Transactions").get();
};

exports.getTransDoc = (transactionNumber) => {
  return db
    .collection("Transactions")
    .where("transactionNumber", "==", transactionNumber)
    .get();
};

exports.createTransDoc = (transactionId, data) => {
  let { documentId, ...payload } = data;
  payload = { ...payload, timestamp: new Date() };

  if (payload.employeePosition === "Helper") {
    transactionId = `${transactionId}-H`;
  }
  return Promise.all([
    db.collection("Transactions").doc(transactionId).set(payload),
    db
      .collection("Employee")
      .doc(documentId)
      .collection("Transaction")
      .doc(transactionId)
      .set(payload),
  ]);
};

exports.updateLastTransaction = async (employeeId, docId, data) => {
  const promisesResult = await Promise.all([
    db
      .collection("Transactions")
      .where("employeeId", "==", employeeId)
      .orderBy("timestamp", "desc")
      .limit(1)
      .get(),
    db
      .collection("Employee")
      .doc(docId)
      .collection("Transaction")
      .orderBy("timestamp", "desc")
      .limit(1)
      .get(),
  ]);

  for (const promise of promisesResult) {
    const ref = promise.docs[0].ref;
    db.runTransaction(async (t) => {
      const doc = await t.get(ref);
      if (data.totalBonuses) {
        const newTotalWage = doc.data().totalWage + data.totalBonuses;
        t.update(ref, { ...data, totalWage: newTotalWage });
      } else {
        const newTotalWage = doc.data().totalWage - data.totalDeductions;
        t.update(ref, { ...data, totalWage: newTotalWage });
      }
    });
  }

  // return Promise.all(
  //   promisesResult.map((promise) => {
  //     promise.docs[0].ref.update(data);
  //   })
  // );
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

exports.getLastTransactionAdjustments = async (employeeId) => {
  const [employee, getResult] = await Promise.all([
    findEmployeeByEmpId(employeeId),
    db
      .collection("Transactions")
      .where("employeeId", "==", employeeId)
      .orderBy("timestamp", "desc")
      .limit(1)
      .get(),
  ]);

  if (getResult.empty) return {};

  const {
    salaryAdvance,
    debt,
    excess,
    loan,
    pagibig,
    sss,
    philhealth,
    otherDeductions,
    overtime,
    holidaysWorked,
    thirteenthMonthPay,
    otherBonuses,
  } = getResult.docs[0].data();
  // console.log("id", getResult.docs[0].id);
  const data = {
    employee,
    deductions: {},
    bonuses: {},
  };

  if (salaryAdvance) {
    data.deductions.salaryAdvance = salaryAdvance;
  }
  if (debt) {
    data.deductions.debt = debt;
  }
  if (excess) {
    data.deductions.excess = excess;
  }
  if (loan) {
    data.deductions.loan = loan;
  }
  if (pagibig) {
    data.deductions.pagibig = pagibig;
  }
  if (sss) {
    data.deductions.sss = sss;
  }
  if (philhealth) {
    data.deductions.philhealth = philhealth;
  }
  if (otherDeductions) {
    data.deductions.otherDeductions = otherDeductions;
  }
  if (overtime) {
    data.bonuses.overtime = overtime;
  }
  if (holidaysWorked) {
    data.bonuses.holidaysWorked = holidaysWorked;
  }
  if (thirteenthMonthPay) {
    data.bonuses.thirteenthMonthPay = thirteenthMonthPay;
  }
  if (otherBonuses) {
    data.bonuses.otherBonuses = otherBonuses;
  }

  return data;
};
