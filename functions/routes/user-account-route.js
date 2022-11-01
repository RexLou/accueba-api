const { register, login, updateAccount } = require("../src/user-account/users");

exports.userAccount = (app) => {
  app.get("/", async (req, res) => {
    res.send("api is running!");
  });
  app.post("/register", register);
  app.post("/login", login);
  app.post("/updateAccount", updateAccount);
};
