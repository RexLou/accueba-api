const { response } = require("../../util/response");
const {
  getTransDoc,
  createTransDoc,
  deleteTransDoc,
  updateTransDoc,
  updateLastTransaction,
  getAllTransDoc,
  getLastTransactionAdjustments,
} = require("../../repositories/transaction-repo");
const { findEmployeeByEmpId } = require("../../repositories/user-repo");

exports.createTransaction = async (req, res) => {
  const data = req.body.data;
  if (!data) return response(res, 400, "Please input a data field");
  const {
    date,
    clientAddress,
    clientContactNumber,
    clientName,
    driverId,
    helperId,
    reasonForDelay,
    status,
    transactionNumber,
    totalDeliveryPaid,
    totalDeliveryHours,
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
  } = data;

  if (
    !date ||
    !clientAddress ||
    !clientContactNumber ||
    !clientName ||
    !driverId ||
    !status ||
    !transactionNumber ||
    !totalDeliveryPaid ||
    !totalDeliveryHours
  ) {
    return response(res, 400, "incorrect fields");
  }

  let totalDeductions = 0;
  let totalBonuses = 0;

  salaryAdvance > 0 ? (totalDeductions += salaryAdvance) : null;
  debt > 0 ? (totalDeductions += debt) : null;
  excess > 0 ? (totalDeductions += excess) : null;
  loan > 0 ? (totalDeductions += loan) : null;
  pagibig > 0 ? (totalDeductions += pagibig) : null;
  sss > 0 ? (totalDeductions += sss) : null;
  philhealth > 0 ? (totalDeductions += philhealth) : null;
  otherDeductions > 0 ? (totalDeductions += otherDeductions) : null;
  overtime > 0 ? (totalBonuses += overtime) : null;
  holidaysWorked > 0 ? (totalBonuses += holidaysWorked) : null;
  thirteenthMonthPay > 0 ? (totalBonuses += thirteenthMonthPay) : null;
  otherBonuses > 0 ? (totalBonuses += otherBonuses) : null;

  const operations = [];

  const payload = {
    date,
    clientAddress: clientAddress,
    clientContact: clientContactNumber,
    clientName: clientName,
    reasonForDelay: reasonForDelay || "",
    status: status,
    transactionNumber: transactionNumber,
    totalDeliveryPaid: Number(totalDeliveryPaid),
    // deductions
    salaryAdvance: salaryAdvance || 0,
    debt: debt || 0,
    excess: excess || 0,
    loan: loan || 0,
    pagibig: pagibig || 0,
    sss: sss || 0,
    philhealth: philhealth || 0,
    otherDeductions: otherDeductions || 0,
    totalDeductions,
    // bonuses
    overtime: overtime || 0,
    holidaysWorked: holidaysWorked || 0,
    thirteenthMonthPay: thirteenthMonthPay || 0,
    otherBonuses: otherBonuses || 0,
    totalBonuses,
    totalHours: Number(totalDeliveryHours),
  };

  const driver = await findEmployeeByEmpId(driverId);

  operations.push({
    ...payload,
    documentId: driver.id,
    employeePosition: "Driver",
    employeeId: driverId,
    totalWages:
      totalDeliveryPaid * 0.13 - payload.totalDeductions + totalBonuses,
  });

  if (helperId) {
    const helper = await findEmployeeByEmpId(helperId);

    operations.push({
      ...payload,
      documentId: helper.id,
      employeePosition: "Helper",
      employeeId: helperId,
      totalWages:
        totalDeliveryPaid * 0.08 - payload.totalDeductions + totalBonuses,
    });
  }

  try {
    await Promise.all(
      operations.map((op) => createTransDoc(transactionNumber, op))
    );
    response(res, 200, "successfully created a transaction", "success");
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.getTransactions = async (req, res) => {
  const output = [];
  try {
    const docs = await getAllTransDoc();
    docs.forEach((doc) => {
      // const docData = doc.data()
      output.push(doc.data());
    });
    response(res, 200, "success", output);
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.getTransactionById = async (req, res) => {
  const transactionNumber = req.body.transactionNumber;
  let transaction = {};
  let driverId = "";
  let helperId = "";

  try {
    const getResult = await getTransDoc(transactionNumber);

    getResult.forEach((val) => {
      const transactionData = val.data();
      transaction = transactionData;
      const employeePosition = transactionData.employeePosition;
      const employeeId = transactionData.employeeId;
      if (employeePosition === "Driver") {
        driverId = employeeId;
      }
      if (employeePosition === "Helper") {
        helperId = employeeId;
      }
    });

    const payload = {
      ...transaction,
      driverId,
      helperId,
    };
    response(res, 200, "success", payload);
  } catch (error) {
    response(res, 400, error.message);
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transId = req.body.transactionID;
    deleteTransDoc(transId).then((val) => {
      response(res, 200, "successfully delete a document", "success");
    });
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const id = req.body.transID;
    const status = req.body.status;
    updateTransDoc(id, status).then((val) => {
      response(res, 400, "successfully update a status", "success");
    });
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.addBonus = async (req, res) => {
  const { employeeId, data, docId } = req.body;
  if (!data) return response(res, 400, "Please input a data field");
  const { overtime, holidaysWorked, thirteenthMonthPay, otherBonuses } = data;
  const payload = {};
  let totalBonuses = 0;

  if (Number(overtime) || overtime === 0) {
    payload.overtime = Number(overtime);
    totalBonuses += Number(overtime);
  }
  if (Number(holidaysWorked) || holidaysWorked === 0) {
    payload.holidaysWorked = Number(holidaysWorked);
    totalBonuses += Number(holidaysWorked);
  }
  if (Number(thirteenthMonthPay) || thirteenthMonthPay === 0) {
    payload.thirteenthMonthPay = Number(thirteenthMonthPay);
    totalBonuses += Number(thirteenthMonthPay);
  }
  if (Number(otherBonuses) || otherBonuses === 0) {
    payload.otherBonuses = Number(otherBonuses);
    totalBonuses += Number(otherBonuses);
  }

  payload.totalBonuses = totalBonuses;
  // console.log("payload :>> ", payload);
  try {
    await updateLastTransaction(employeeId, docId, payload);
    response(res, 200, "success");
  } catch (error) {
    response(res, 400, error.message);
  }
};

exports.addDeductions = async (req, res) => {
  const { employeeId, docId, data } = req.body;
  if (!data) return response(res, 400, "Please input a data field");
  const {
    salaryAdvance,
    debt,
    excess,
    loan,
    pagibig,
    sss,
    philhealth,
    otherDeductions,
  } = data;
  const payload = {};
  let totalDeductions = 0;

  if (Number(salaryAdvance)) {
    payload.salaryAdvance = Number(salaryAdvance);
    totalDeductions += Number(salaryAdvance);
  }
  if (Number(debt)) {
    payload.debt = Number(debt);
    totalDeductions += Number(debt);
  }
  if (Number(excess)) {
    payload.excess = Number(excess);
    totalDeductions += Number(excess);
  }
  if (Number(loan)) {
    payload.loan = Number(loan);
    totalDeductions += Number(loan);
  }
  if (Number(pagibig)) {
    payload.pagibig = Number(pagibig);
    totalDeductions += Number(pagibig);
  }
  if (Number(sss)) {
    payload.sss = Number(sss);
    totalDeductions += Number(sss);
  }
  if (Number(philhealth)) {
    payload.philhealth = Number(philhealth);
    totalDeductions += Number(philhealth);
  }
  if (Number(otherDeductions)) {
    payload.otherDeductions = Number(otherDeductions);
    totalDeductions += Number(otherDeductions);
  }

  payload.totalDeductions = totalDeductions;
  // console.log("payload :>> ", payload);
  try {
    await updateLastTransaction(employeeId, docId, payload);
    response(res, 200, "success");
  } catch (error) {
    response(res, 400, error.message);
  }
};

exports.getAdjustments = async (req, res) => {
  const employeeID = req.body.empId;
  const data = await getLastTransactionAdjustments(employeeID);
  if (!Object.keys(data).length) {
    return response(res, 400, "No transaction found", data);
  }
  response(res, 200, "success", data);
};
