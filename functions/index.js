const express = require("express");
const app = express("express");
const cors = require("cors");
const functions = require("firebase-functions");
const { payrollRoute, allPayrollRoute } = require("./routes/payroll-route");
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
app.get("/testmessage", async (req, res) => {
  try {
    const client = require("twilio")(
      "AC44deb238c466c7ea0f1de99fc42b015e",
      "57ebdf3207d136fd0a4968899fba3aa5"
    );
    client.messages
      .create({
        body: `Your payroll has been relase P ${500}`,
        to: "+639426459702",
        from: "+15856288930",
      })
      .catch((e) => {
        res.send({ message: e.message });
      });
  } catch (error) {
    res.send({ message: error.message });
  }
});
userAccount(app);
employeeMod(app);
transaction(app);
attendance(app);
salaryComputation(app);
payrollRoute(app);
allPayrollRoute(app);

exports.api = functions.runWith({ memory: "1GB" }).https.onRequest(app);
app.listen(3030, () => console.log("running on port 3030"));
