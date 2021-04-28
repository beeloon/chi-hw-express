import express from "express";

import * as userController from "../modules/user/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", userController.listUsers);
userRouter.post("/", userController.signupUser);

userRouter.get("/:id", userController.getUser);
userRouter.patch("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
