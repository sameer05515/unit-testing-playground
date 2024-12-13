const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config/version-config");

const {
  sendStandardResponse,
  ResponseStatus,
} = require("../../../common/server-responses/StandardResponse");
const { StatusCodes } = require("http-status-codes");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    sendStandardResponse(
      res,
      ResponseStatus.Error,
      ["Authorization Error"],
      null,
      StatusCodes.UNAUTHORIZED,
      { message: "Authorization header is missing" }
    );
    return;
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      sendStandardResponse(
        res,
        ResponseStatus.Error,
        ["Authorization Error"],
        null,
        StatusCodes.FORBIDDEN,
        { message: "Invalid access token: " + err }
      );
      return;
    }

    req.user = user?.username || "";
    next();
  });
};

module.exports = authenticateToken;
