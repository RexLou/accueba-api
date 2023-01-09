const express = require("express");
const app = express("express");
const cors = require("cors");
const functions = require("firebase-functions");
const { payrollRoute } = require("./routes/payroll-route");
const { userAccount } = require("./routes/user-account-route");
const { employeeMod } = require("./routes/employee-mod-route");
const { transaction } = require("./routes/transaction-route");
const { attendance } = require("./routes/attendance-route");
const { salaryComputation } = require("./routes/salary-computation-route");
const { appConfig } = require("./util/index-app-config");

// appConfig(app, cors(), express.json(), express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

userAccount(app);
employeeMod(app);
transaction(app);
attendance(app);
salaryComputation(app);
payrollRoute(app);

exports.api = functions.runWith({ memory: "1GB" }).https.onRequest(app);
app.listen(3030, () => console.log("running on port 3030"));
