const jwt = require("jsonwebtoken");
const UserModel = require("../users/schema");

const generateJWT = (payload) =>
  new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 6 },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    );
  });

const generateRefreshJWT = (payload) =>
  new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.REFRESH_JWT_SECRET,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    );
  });

const getAccessAndRefreshToken = async (user) => {
  try {
    const accessToken = await generateJWT({ _id: user._id });
    const refreshToken = await generateRefreshJWT({ _id: user._id });
    user.refreshTokens = user.refreshTokens.concat({ token: refreshToken });

    await user.save();

    console.log(`
    refreshToken
    ============================
    ${refreshToken}
    `);

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error);
  }
};

const verifyJWT = (token) => {
  new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) rej(err);
      res(decoded);
    });
  });
};

const verifyRefreshToken = (token) => {
  new Promise((res, rej) => {
    jwt.verify(token, process.env.REFRESH_JWT_SECRET, (err, decoded) => {
      if (err) rej(err);
      res(decoded);
    });
  });
};

const refreshToken = async (oldRefreshToken) => {
  const decoded = await verifyRefreshToken(oldRefreshToken);

  const user = await UserModel.findOne({ _id: decoded._id });

  if (!user) throw Error("Access is forbiden");
};

module.exports = { verifyJWT, getAccessAndRefreshToken, refreshToken };
