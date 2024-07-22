require("dotenv").config();

const SERVER_VERSION = "1.0.0";

const {
  OVERALL_TARGET_IN_NEXT_MAJOR_RELEASE,
  getPurposeByVersion
  // ACCESS_TOKEN_SECRET,
  // PORT_1_0_0: PORT,
} = require("../../common/config/config");

const purpose = getPurposeByVersion(SERVER_VERSION);

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Prem",
    title: "Post 2",
  },
];

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "matru-ki-bijli-ka-hindola";
const PORT =
  process.env.PORT_1_0_0 || 3000;

app.get("/posts", authenticateToken, (req, res) => {
  const p = posts.filter((post) => post.username === req.user.name);
  res.json({ data: p, timeStamp: new Date().toString() });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ error: "Authorization header is missing" });

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ error: "Invalid access token: " + err });
    }
    req.user = user;
    next();
  });
}

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  res.json({ accessToken: accessToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15h" });
}

console.log(
  `${purpose} \n [${new Date().toString()}]: Starting server with version '${SERVER_VERSION}' on http://localhost:${PORT}`
);
app.listen(PORT);
