const { db } = require("../../util/admin");

exports.register = async (req, res) => {
  const data = req.body.data;

  await db
    .collection("Employee")
    .add({ ...data })
    .then((val) => {
      res.send({ status: 200, message: "success" });
    });
};

exports.login = async (req, res) => {
  const userID = req.body.userID;
  const password = req.body.password;

  const employeeRef = await db
    .collection("Employee")
    .where("empID", "==", userID)
    .where("empPassword", "==", password)
    .get();
  const employeeDocs = employeeRef.docs[0];
  if (employeeRef.docs.length != 0) {
    res.send({
      status: 200,
      result: "success",
      employeeData: employeeDocs.data(),
    });
    return;
  }
  res.send({ status: 200, message: "no account found" });
};
