const { SECRET_KEY } = require("./constants");
const jwt = require("jsonwebtoken");

exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.generateUniqueId = () => {
  const uniqueId = Date.now()?.toString();
  return uniqueId.substring(0, 1) + uniqueId.substring(2);
};

exports.sendResponse = ({ res, code, message, data }) =>
  res.status(code).send({ code, message, data });

exports.generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const secret = SECRET_KEY;
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
};

exports.verifyAccessToken = (token) => {
  const secret = SECRET_KEY;

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

exports.encodePassword = (password) => {
  return Buffer.from(password.toString()).toString("base64");
};

// Decode password
exports.decodePassword = (encodedPassword) => {
  return Buffer.from(encodedPassword.toString(), "base64").toString("utf-8");
};

exports.validatePassword = ({ encodedPassword, password }) => {
  return (
    this.decodePassword(encodedPassword.toString()).toString() ===
    password.toString()
  );
};
