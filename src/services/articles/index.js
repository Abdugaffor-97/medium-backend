const { Router } = require("express");
const mongoose = require("mongoose");
const ArticleModel = require("./schema");
const q2m = require("query-to-mongo");

const articleRouter = Router();

// DAY 3

articleRouter.delete("/:id/claps", async (req, res, next) => {
  try {
    const { claps } = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { claps: req.body.userId } },
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(201).send(claps);
  } catch (error) {
    next(error);
  }
});

articleRouter.post("/:id/claps", async (req, res, next) => {
  try {
    const { claps } = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      { $push: { claps: req.body.userId } },
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(201).send(claps);
  } catch (error) {
    next(error);
  }
});

articleRouter.get("/:id/claps", async (req, res, next) => {
  try {
    const { claps } = await ArticleModel.findById(req.params.id);
    console.log(claps);
    if (claps.length) {
      res.send(claps);
    } else {
      res.status(401);
      next();
    }
  } catch (error) {
    next(error);
  }
});

// DAY 2
articleRouter.post("/:id", async (req, res, next) => {
  try {
    const article = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { reviews: { ...req.body, createdAt: new Date() } },
      },
      { runValidators: true, new: true }
    );

    res.send(article);
  } catch (error) {
    next(error);
  }
});

articleRouter.put("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const { reviews } = await ArticleModel.findById(req.params.id, {
      _id: 0,
      reviews: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(req.params.reviewId),
        },
      },
    });

    if (reviews.length) {
      const updatedReview = {
        ...reviews[0].toObject(),
        ...req.body,
        updatedAt: new Date(),
      };
      const modifiedArticle = await ArticleModel.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params.id),
          "reviews._id": mongoose.Types.ObjectId(req.params.reviewId),
        },
        { $set: { "reviews.$": updatedReview } },
        {
          runValidators: true,
          new: true,
        }
      );

      res.send(modifiedArticle);
    } else {
      res.status(404);
      next();
    }
  } catch (error) {
    next(error);
  }
});

articleRouter.delete("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          reviews: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
        },
      },
      { new: true }
    );
    res.send(updatedArticle);
  } catch (error) {
    next(error);
  }
});

articleRouter.get("/:id/reviews", async (req, res, next) => {
  try {
    const { reviews } = await ArticleModel.findById(req.params.id, {});
    if (reviews.length) {
      res.send(reviews);
    } else {
      res.status(404).send("Reviews not exist");
    }
  } catch (error) {
    next(error);
  }
});

articleRouter.get("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const { reviews } = await ArticleModel.findById(req.params.id, {
      _id: 0,
      reviews: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(req.params.reviewId),
        },
      },
    });
    if (reviews.length) {
      res.send(reviews[0]);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    next(error);
  }
});

// DAY 1
articleRouter.post("/", async (req, res, next) => {
  try {
    const newArticle = new ArticleModel(req.body);
    newArticle.save();
    const { _id } = await newArticle;
    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

articleRouter.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query);
    const totalArticles = await ArticleModel.countDocuments(query.criteria);

    const articles = await ArticleModel.find(
      query.criteria,
      query.options.fields
    )
      .skip(query.options.skip)
      .limit(query.options.limit)
      .sort(query.options.sort);
    console.log("req.query", req.query);
    if (articles.length) {
      res.send({ links: query.links("/articles", totalArticles), articles });
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
    const article = await ArticleModel.findById(req.params.id);
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
    const article = await ArticleModel.findOneAndDelete(req.params.id);
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

articleRouter.put("/:id", async (req, res, next) => {
  try {
    const article = await ArticleModel.findByIdAndUpdate(
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
