import express from "express";

import { createUserRoutes } from "./user";

export const createRouter = (app) => {
  const router = express.Router();

  createUserRoutes(router);

  app.use("/api", router);
};
