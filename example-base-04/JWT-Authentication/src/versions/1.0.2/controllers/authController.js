const { generateAccessToken } = require("../utils/jwtUtils");

exports.login = (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  res.json({ accessToken: accessToken });
};
