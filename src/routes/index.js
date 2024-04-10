const router = require("express").Router();

require("./users/registerUser")(router);
require("./users/users")(router);
require("./todos/crudTodo")(router);
require("./users/login")(router);
require("./upload/imageUpload")(router);
require("./upload/csvUpload")(router);

module.exports = {
  router,
};
