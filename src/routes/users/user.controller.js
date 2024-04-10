const { users, sequelize } = require("../../../sequelizer/models");
const {
  validateEmail,
  sendResponse,
  encodePassword,
  validatePassword,
  generateAccessToken,
} = require("../../utils/functions");
const { STATUS_CODES } = require("../../utils/statusCodes");
const { createUser } = require("./queries");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.findAll();
    if (allUsers)
      sendResponse({ res, code: STATUS_CODES.SUCCESS, data: allUsers });
  } catch (err) {
    console.log(err);
  }
};

exports.registerUserHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!validateEmail(email)) {
    sendResponse({
      res,
      code: STATUS_CODES.CLIENT_ERROR,
      message: "Please provide valid email",
    });
  } else if (validateEmail(email) && password) {
    const user = await users.findOne({ where: { email } });
    if (user)
      sendResponse({
        res,
        code: STATUS_CODES.CLIENT_ERROR,
        message: "User Exists with this email",
      });
    else {
      await users.create({
        email,
        password: encodePassword(password),
      });

      sendResponse({
        res,
        code: STATUS_CODES.SUCCESS,
        message: "User created successfully",
      });
    }
  } else {
    sendResponse({
      res,
      code: STATUS_CODES.CLIENT_ERROR,
      message: "Please provide both email and password",
    });
  }
};

exports.loginHandler = async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  if (!validateEmail(email)) {
    sendResponse({
      res,
      code: STATUS_CODES.CLIENT_ERROR,
      message: "Please provide valid email",
    });
  } else if (!email && !password) {
    sendResponse({
      res,
      code: STATUS_CODES.CLIENT_ERROR,
      message: "Please provide both email and password",
    });
  } else if (validateEmail(email) && password) {
    const user = await users.findOne({ where: { email } });
    const isValidUser = validatePassword({
      encodedPassword: user?.password,
      password,
    });
    if (!isValidUser) {
      sendResponse({
        res,
        code: STATUS_CODES.CLIENT_ERROR,
        message: "Invalid password",
      });
    } else {
      const token = generateAccessToken(user);
      sendResponse({
        res,
        code: STATUS_CODES.SUCCESS,
        data: { ...user.dataValues, accessToken: token },
      });
    }
  }
};
