import express from 'express';

import authController from './auth.controller';

const createAuthRoutes = (router) => {
  const authRouter = express.Router();

  authRouter.get('/login', authController.login);
  authRouter.get('/signup', authController.signup);
  authRouter.get('/signout', authController.signout);

  router.use('/auth', authRouter);
};

export default createAuthRoutes;
