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
        text: String,
        user: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Article", ArticleSchema);
