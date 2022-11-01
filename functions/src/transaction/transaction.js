const { response } = require("../../util/response");
const {
  getTransDoc,
  createTransDoc,
  deleteTransDoc,
  updateTransDoc,
} = require("../../repositories/transaction-repo");
exports.createTransaction = async (req, res) => {
  try {
    const data = req.body.data;
    createTransDoc(data).then((val) => {
      response(res, 400, "successfully create a transaction", "success");
    });
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
