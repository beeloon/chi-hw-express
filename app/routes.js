import express from 'express';
import passport from 'passport';

import createUserRoutes from './modules/user/user.routes';
import createPostRoutes from './modules/post/post.routes';
import createAuthRoutes from './modules/auth/auth.routes';
import createFollowerRoutes from './modules/follower/follower.routes';

const createRouter = (app) => {
  const router = express.Router();
  const authRouter = express.Router();

  createUserRoutes(router);
  createPostRoutes(router);
  createFollowerRoutes(router);
  createAuthRoutes(authRouter);

  app.use('/api', passport.authenticate('jwt'), router);
  app.use('/auth', authRouter);
  app.all('*', (req, res) =>
    res.sendStatus(404).json({
      status: 404,
      message: 'Page Not Found',
    })
  );
};

export default createRouter;
