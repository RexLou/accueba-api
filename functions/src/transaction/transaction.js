const { response } = require("../../util/response");
const {
  getTransDoc,
  createTransDoc,
  deleteTransDoc,
  updateTransDoc,
} = require("../../repositories/transaction-repo");

exports.createTransaction = async (req, res) => {
  const data = req.body.data;
  if (!data) return response(res, 400, "Please input a data field");
  const {
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
    clientAddress: clientAddress,
    clientContact: clientContactNumber,
    clientName: clientName,
    reasonForDelay: reasonForDelay || "",
    status: status,
    transactionNumber: transactionNumber,
    totalDeliveryPaid,
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
    totalHours: totalDeliveryHours,
  };

  operations.push({
    ...payload,
    employeePosition: "Driver",
    employeeId: driverId,
    totalWages:
      totalDeliveryPaid * 0.13 - payload.totalDeductions + totalBonuses,
  });

  if (helperId) {
    operations.push({
      ...payload,
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

exports.getTransaction = async (req, res) => {
  try {
    getTransDoc().then((val) => {
      response(res, 200, "successfully create a document", val);
    });
  } catch (error) {
    response(res, 400, error.message, "something went wrong.");
  }
};

exports.getTransactionById = async (req, res) => {
  const transactionNumber = req.body.transactionNumber;
  console.log("transactionNumber", transactionNumber);
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
