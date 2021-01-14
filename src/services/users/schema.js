const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: String,
  email: String,
  articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
});

module.exports = model("User", UserSchema);
