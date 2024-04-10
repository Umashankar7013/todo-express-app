const { todos, sequelize } = require("../../../sequelizer/models");
const { sendResponse, generateUniqueId } = require("../../utils/functions");
const { STATUS_CODES } = require("../../utils/statusCodes");
const { getUsersFromFile, writeIntoFile } = require("../users/helpers");
const { getTodosFromFile, writeIntoTodosFile } = require("./helper");
const { updateTodo, getTodos, deleteTodo } = require("./queries");

exports.getAllTodos = async (req, res) => {
  const allTodos = await sequelize.query(getTodos, {
    type: sequelize.QueryTypes.SELECT,
  });

  if (allTodos) {
    sendResponse({
      res,
      code: STATUS_CODES.SUCCESS,
      data: allTodos,
    });
  }
};

exports.createNewTodoHandler = async (req, res) => {
  const user_id = req.user_id;
  const { todo } = req.body;
  const data = await todos.create({ title: todo, user_id });
  if (data)
    sendResponse({
      res,
      code: STATUS_CODES.SUCCESS,
      message: "Todo created successfully",
    });
};

exports.updateTodoHandler = async (req, res) => {
  const { todoId } = req.params;
  const { todo } = req.body;
  if (!todoId || !todo) {
    sendResponse({
      res,
      code: STATUS_CODES.CLIENT_ERROR,
      message: "Invalid param/body",
    });
  } else {
    await sequelize.query(updateTodo({ title: todo, id: todoId }));
    sendResponse({
      res,
      code: STATUS_CODES.SUCCESS,
      message: "Todo updated succesfully",
    });
  }
};

exports.deleteTodoHandler = async (req, res) => {
  const { todoId } = req.params;
  if (!todoId) {
    sendResponse({
      res,
      code: STATUS_CODES.CLIENT_ERROR,
      message: "Invalid param",
    });
  } else {
    await sequelize.query(deleteTodo(todoId));
    sendResponse({
      res,
      code: STATUS_CODES.SUCCESS,
      message: "Todo deleted succesfully",
    });
  }
};
