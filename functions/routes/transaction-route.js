const {
  createTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactionById,
} = require("../src/transaction/transaction");

exports.transaction = (app) => {
  app.post("/createTransaction", createTransaction);
  app.get("/getTransaction", getTransaction);
  app.post("/getTransactionById", getTransactionById);
  app.post("/deleteTransaction", deleteTransaction);
  app.post("/updateTransaction", updateTransaction);
};
