const { verifyAccessToken, sendResponse } = require("../../utils/functions");
const { STATUS_CODES } = require("../../utils/statusCodes");

exports.validateAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const validateToken = verifyAccessToken(authHeader);
  if (!validateToken?.success) {
    sendResponse({
      res,
      code: STATUS_CODES.UN_AUTHORIZED,
      message: "Token expired",
    });
    return;
  } else {
    req.user_id = validateToken?.data?.id;
    next();
  }
};
