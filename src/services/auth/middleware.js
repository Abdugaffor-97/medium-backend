const { verifyJWT } = require("./tools");
const UserModel = require("../users/schema");

const authorize = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    const decoded = await verifyJWT(token);
    const user = await UserModel.findById(decoded._id);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user.user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authorize };
