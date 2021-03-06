const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  username: { type: String, required: true },
  surname: String,
  email: String,
  password: String,
  articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  refreshTokens: [{ token: String }],
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.__v;
  delete userObj.password;

  return userObj;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) return user;

    return null;
  }

  return null;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  const plainPassword = user.password;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(plainPassword, 10);
  }
  next();
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
