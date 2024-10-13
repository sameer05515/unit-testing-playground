const { generateAccessToken } = require("../utils/jwtUtils");
const { NotFoundError } = require('../../../common/server-responses/customResponseTypes');

const existingUsers = [
  {
    id: 1,
    name: 'Premendra Kumar',
    username: 'Prem'
  },
  {
    id: 2,
    name: 'Kyle Kumar',
    username: 'Kyle'
  }
]

exports.loginUser = (username) => {
  const user = existingUsers.find(u => u.username === username);
  if (!user) {
    throw new NotFoundError(`No user found for given username : '${username}'`);
  }
  const accessToken = generateAccessToken(user);
  return accessToken;
};
