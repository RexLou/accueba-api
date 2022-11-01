const { response } = require("../../util/response");

exports.salaryComputation = async (req, res) => {
  const data = req.body.data;

  const result = {
    earnings: {
      totalDeliverPaid: data.totalDeliverPaid,
      paidDays: data.paidDays,
    },
    deduction: {
      salaryAdvance: data.salaryAdvance,
      debt: data.debt,
      excess: data.excess,
      philHealth: data.philHealth,
      pagIbig: data.pagIbig,
      sss: data.sss,
      loan: data.loan,
    },
    totalWages: data.totalWages,
    totalDeduction: data.totalDeduction,
    totalSalary: totalWage - totalDeduction,
  };
  response(res, 200, "calculated price", result);
  return;
};
