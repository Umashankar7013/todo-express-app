const { sendResponse } = require("../../utils/functions");
const { STATUS_CODES } = require("../../utils/statusCodes");
const fs = require("fs");

exports.getTodosFromFile = async () => {
  return new Promise((resolve, reject) => {
    const path = require("path");
    const filePath = path.join("src/files/todos.json");
    fs.readFile(filePath, { encoding: "utf8" }, (err, jsonData) => {
      if (err) {
        reject(err);
        sendResponse({
          res,
          code: STATUS_CODES.CLIENT_ERROR,
          message: err.message,
        });
        return;
      }
      const obj = jsonData ? JSON.parse(jsonData) : {};
      resolve(obj);
    });
  });
};

exports.writeIntoTodosFile = async (data) => {
  return new Promise((resolve, reject) => {
    const path = require("path");
    const filePath = path.join("src/files/todos.json");
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      reject(err);
      return;
    });
    resolve({ success: true });
  });
};
