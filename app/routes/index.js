import express from "express";

import { createUserRoutes } from "./user";
import { createPostRoutes } from "./post";

export const createRouter = (app) => {
  const router = express.Router();

  [createUserRoutes, createPostRoutes].forEach((fn) => fn(router));

  app.use("/api", router);
};
