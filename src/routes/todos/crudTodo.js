const {
  verifyAccessToken,
  sendResponse,
  generateUniqueId,
} = require("../../utils/functions");
const { STATUS_CODES } = require("../../utils/statusCodes");
const fs = require("fs");
const { validateAccessToken } = require("./todos.middleware");
const {
  getAllTodos,
  createNewTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
} = require("./todo.controller");

module.exports = function (app) {
  app.post("/todo", validateAccessToken, createNewTodoHandler);

  app.patch("/todo/:todoId", validateAccessToken, updateTodoHandler);

  app.delete("/todo/:todoId", validateAccessToken, deleteTodoHandler);

  app.get("/todos", validateAccessToken, getAllTodos);
};
