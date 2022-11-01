const {
  createTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../src/transaction/transaction");

exports.transaction = (app) => {
  app.post("/createTransaction", createTransaction);
  app.get("/getTransaction", getTransaction);
  app.post("/deleteTransaction", deleteTransaction);
  app.post("/updateTransaction", updateTransaction);
};
