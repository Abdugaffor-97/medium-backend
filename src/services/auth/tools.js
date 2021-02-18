const jwt = require("jsonwebtoken");

const authenticate = async (user) => {
  try {
  } catch (error) {}
};

const verifyJWT = (token) => {
  new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) rej(err);
      res(decoded);
    });
  });
};

module.exports = { verifyJWT };
