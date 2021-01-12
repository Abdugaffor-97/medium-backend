const express = require("express");
const ArticleSchema = require("./schema");

const articleRouter = express.Router();

articleRouter.post("/", async (req, res, next) => {
  try {
    const newArticle = new ArticleSchema(req.body);
    console.log(newArticle);
    const { _id } = await newArticle;
    res.status(201).send(newArticle);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.get("/", async (req, res, next) => {
  try {
    const articles = await ArticleSchema.find();
    console.log(articles);
    if (articles.length) {
      res.send(articles);
    } else {
      const error = new Error();
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.get("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const article = await ArticleSchema.findById(req.params.id);
    if (article) {
      res.send(article);
    } else {
      const error = new Error();
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.delete("/:id", async (req, res, next) => {
  try {
    const article = await ArticleSchema.findOneAndDelete(req.params.id);
    if (article) {
      res.send("Deleted");
    } else {
      const error = new Error();
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.delete("/:id", async (req, res, next) => {
  try {
    const article = await ArticleSchema.findOneAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, new: true }
    );
    if (article) {
      res.send(article);
    } else {
      const error = new Error();
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = articleRouter;
