const { getAllUsers } = require("./user.controller");

module.exports = function (app) {
  app.get("/users", getAllUsers);
};
