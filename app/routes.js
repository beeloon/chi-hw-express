import express from 'express';

import { createUserRoutes } from './modules/user/user.routes';
import { createPostRoutes } from './modules/post/post.routes';
import { createFollowerRoutes } from './modules/follower/follower.routes';

export const createRouter = (app) => {
  const router = express.Router();

  createUserRoutes(router);
  createPostRoutes(router);
  createFollowerRoutes(router);

  app.use('/api', router);
};
