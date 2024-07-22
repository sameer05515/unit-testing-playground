const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config/version-config");

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "15h" });
}

module.exports = {
  generateAccessToken,
};
