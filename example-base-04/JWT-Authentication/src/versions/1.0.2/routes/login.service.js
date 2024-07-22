const { generateAccessToken } = require("../utils/jwtUtils");
const { NotFoundError } = require('../../../common/server-responses/customResponseTypes');

const existingUsers = [
  {
    id: 1,
    name: 'Premendra Kumar',
    username: 'Prem',
  },
  {
    id: 2,
    name: 'Kyle Kumar',
    username: 'Kyle',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    username: 'Alice',
  },
  {
    id: 4,
    name: 'John Smith',
    username: 'John',
  },
  {
    id: 5,
    name: 'Sara Lee',
    username: 'Sara',
  },
  {
    id: 6,
    name: 'Mike Williams',
    username: 'Mike',
  },
  {
    id: 7,
    name: 'Priya Patel',
    username: 'Priya',
  },
  {
    id: 8,
    name: 'Alex Thompson',
    username: 'Alex',
  },
  {
    id: 9,
    name: 'Emma Brown',
    username: 'Emma',
  },
  {
    id: 10,
    name: 'Liam Davis',
    username: 'Liam',
  },
  {
    id: 11,
    name: 'Olivia Martin',
    username: 'Olivia',
  },
  {
    id: 12,
    name: 'David Moore',
    username: 'David',
  },
  {
    id: 13,
    name: 'Sophia Taylor',
    username: 'Sophia',
  },
  {
    id: 14,
    name: 'James Anderson',
    username: 'James',
  },
  {
    id: 15,
    name: 'Lucas Thomas',
    username: 'Lucas',
  },
  {
    id: 16,
    name: 'Isabella White',
    username: 'Isabella',
  },
  {
    id: 17,
    name: 'Ethan Harris',
    username: 'Ethan',
  },
  {
    id: 18,
    name: 'Mia Jackson',
    username: 'Mia',
  },
  {
    id: 19,
    name: 'Noah Lewis',
    username: 'Noah',
  },
  {
    id: 20,
    name: 'Ava Walker',
    username: 'Ava',
  }
];


exports.loginUser = (username) => {
  const user = existingUsers.find(u => u.username === username);
  if (!user) {
    throw new NotFoundError(`No user found for given username : '${username}'`);
  }
  const accessToken = generateAccessToken(user);
  return accessToken;
};
