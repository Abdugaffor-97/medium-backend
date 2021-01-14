const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema(
  {
    headLine: String,
    subHead: String,
    content: String,
    category: {
      name: String,
      img: String,
    },
    author: {
      name: String,
      img: String,
    },
    cover: String,
    reviews: [
      {
        text: { type: String, required: true },
        user: { type: String, required: true },
        createdAt: { type: Date, required: false },
        updatedAt: { type: Date, required: false },
      },
    ],
    claps: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
  },
  { timestamps: true }
);

module.exports = model("Article", ArticleSchema);
