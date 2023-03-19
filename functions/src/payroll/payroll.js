const {
  getLatestPayrollRepo,
  getAllPayrollRepo,
} = require("../../repositories/payroll-repo");
exports.getLatestPayroll = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const data = await getLatestPayrollRepo(id);

    res.status(200).send({ result: data, message: "success" });
  } catch (error) {
    res.send({ result: error.message, message: "failed" });
  }
};

exports.getAllPayroll = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const data = await getAllPayrollRepo(id);

    res.status(200).send({ result: data, message: "success" });
  } catch (error) {
    res.send({ result: error.message, message: "failed" });
  }
};
