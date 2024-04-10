const { registerUserHandler } = require("./user.controller");

module.exports = function (app) {
  app.post("/register", registerUserHandler);
};
