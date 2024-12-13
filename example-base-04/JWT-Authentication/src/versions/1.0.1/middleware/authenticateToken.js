const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config/version-config");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ error: "Invalid access token: " + err });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
