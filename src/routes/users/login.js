const { loginHandler } = require("./user.controller");

module.exports = function (app) {
  app.post("/login", loginHandler);
};
