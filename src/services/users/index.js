const { Router } = require("express");
const { authorize } = require("../auth/middleware");
const { getAccessAndRefreshToken } = require("../auth");
const UserModel = require("./schema");

const userRouter = Router();

// userRouter.post("/", async (req, res, next) => {
//   try {
//     const newUser = new UserModel(req.body);
//     const { _id } = await newUser.save();
//     res.status(201).send(_id);
//   } catch (error) {
//     next(error);
//   }
// });

userRouter.get("/", authorize, async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/me", authorize, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    const { _id } = await newUser.save();
    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByCredentials(email, password);

    const tokens = await getAccessAndRefreshToken(user);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/:id", async (req, res, next) => {
  try {
    const modifiedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    if (modifiedUser) {
      res.send(modifiedUser);
    } else {
      res.status(404);
      next();
    }
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
