const {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getTransactionById,
  addBonus,
  addDeductions,
  getAdjustments,
} = require("../src/transaction/transaction");

exports.transaction = (app) => {
  app.post("/createTransaction", createTransaction);
  app.get("/getTransactions", getTransactions);
  app.post("/getTransactionById", getTransactionById);
  app.post("/addBonus", addBonus);
  app.post("/addDeduction", addDeductions);
  app.post("/getAdjustments", getAdjustments);
  app.post("/deleteTransaction", deleteTransaction);
  app.post("/updateTransaction", updateTransaction);
};
