import express from "express";

import UserController from "./user.controller";

export const createUserRoutes = (router) => {
  const userRouter = express.Router();
  const userController = new UserController();

  userRouter.get("/", userController.listUsers);
  userRouter.post("/", userController.signupUser);

  userRouter.get("/:id", userController.getUser);
  userRouter.post("/:id", userController.addNewPost);
  userRouter.patch("/:id", userController.updateUser);
  userRouter.delete("/:id", userController.deleteUser);

  router.use("/users", userRouter);
};
