const jwt = require("jsonwebtoken");



const generateJWT = (payload) => {
  new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 6 },
      (err, token) => {
        if (err) rej(err)
        res(token)
      }
    )
  })
}


const generateRefreshJWT = (payload) => {
  new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.REFRESH_JWT_SECRET,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) rej(err)
        res(token)
      }
    )
  })
}


const authenticate = async (user) => {
  try {
    const newAccessToken = await generateJWT({ _id: user._id })
    const newRefreshToken = await generateRefreshJWT({ _id: user._id })

    user.refreshTokens = user.refreshTokens.concat({ token: newRefreshToken })
    
    await user.save()

    return { token: newAccessToken, refreshToken: newRefreshToken}
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

module.exports = { verifyJWT, authenticate };
