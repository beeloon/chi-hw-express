import express from "express";

import { createUserRoutes } from "./modules/user/user.routes";
import { createPostRoutes } from "./modules/post/post.routes";

export const createRouter = (app) => {
  const router = express.Router();

  [createUserRoutes, createPostRoutes].forEach((fn) => fn(router));

  app.use("/api", router);
};
