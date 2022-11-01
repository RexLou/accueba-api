const {
  createEmployeeDocuments,
  getEmployeeDocuments,
  deleteDocument,
  updateStatus,
} = require("../src/user-account/employee-mod");

exports.employeeMod = (app) => {
  app.post("/createEmployeeDocuments", createEmployeeDocuments);
  app.get("/getEmployeeDocuments", getEmployeeDocuments);
  app.post("/deleteDocument", deleteDocument);
  app.post("/updateStatus", updateStatus);
};
