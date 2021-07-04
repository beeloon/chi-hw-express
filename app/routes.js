import express from 'express';

import createUserRoutes from './modules/user/user.routes';
import createPostRoutes from './modules/post/post.routes';
import createAuthRoutes from './modules/auth/auth.routes';
import createFollowerRoutes from './modules/follower/follower.routes';

const createRouter = (app) => {
  const router = express.Router();

  createUserRoutes(router);
  createPostRoutes(router);
  createAuthRoutes(router);
  createFollowerRoutes(router);

  app.use('/api', router);
  app.all('*', (req, res) =>
    res.sendStatus(404).json({
      status: 404,
      message: 'Page Not Found',
    })
  );
};

export default createRouter;
