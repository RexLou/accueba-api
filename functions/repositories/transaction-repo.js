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
      const docData = doc.data();
      let newTotalBonuses = docData.totalBonuses;
      let newTotalDeductions = docData.totalDeductions;
      let newTotalWages = docData.totalWages;

      // recompute totalBonuses or totalDeductions, and totalWages
      for (const key in data) {
        if (
          // for computing bonuses
          key === "overtime" ||
          key === "holidaysWorked" ||
          key === "thirteenthMonthPay" ||
          key === "otherBonuses"
        ) {
          if (data[key] > docData[key]) {
            // if new bonus is greater, increment bonus
            newTotalBonuses += data[key] - docData[key];
            newTotalWages += data[key] - docData[key];
          } else {
            // reduce bonus
            newTotalBonuses -= docData[key] - data[key];
            newTotalWages -= docData[key] - data[key];
          }
          t.update(ref, {
            ...data,
            totalBonuses: newTotalBonuses,
            totalWages: newTotalWages,
          });
        } else {
          // for computing deductions
          if (data[key] > docData[key]) {
            newTotalDeductions += data[key] - docData[key];
            newTotalWages -= data[key] - docData[key];
          } else {
            newTotalDeductions -= docData[key] - data[key];
            newTotalWages += docData[key] - data[key];
          }
          t.update(ref, {
            ...data,
            totalDeductions: newTotalDeductions,
            totalWages: newTotalWages,
          });
        }
      }
      // console.log("newTotalWages", newTotalWages);
      // return;
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
