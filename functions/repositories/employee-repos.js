const { db } = require("../util/admin");

exports.findAllEmployees = async () => {
  const output = [];
  const findResult = await db.collection("Employee").get();
  findResult.forEach((emp) => {
    console.log(emp.id, emp.createTime.toDate());
    output.push({ id: emp.id, data: emp.data() });
  });
  return output;
};
