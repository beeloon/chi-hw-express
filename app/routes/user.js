import express from "express";

import UserController from "../modules/user/user.controller";

export const createUserRoutes = (router) => {
  const userRouter = express.Router();
  const userController = new UserController();

  userRouter.get("/", userController.listUsers);
  userRouter.post("/", userController.signupUser);

  userRouter.get("/:id", userController.getUser);
  userRouter.patch("/:id", userController.updateUser);
  userRouter.delete("/:id", userController.deleteUser);

  router.use("/users", userRouter);
};
