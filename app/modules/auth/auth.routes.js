import express from 'express';
import { createValidator } from 'express-joi-validation';

import passport from './auth.strategies';
import authController from './auth.controller';

import userSchema from '../user/user.schema';

const validator = createValidator();

const createAuthRoutes = (router) => {
  const authRouter = express.Router();

  authRouter.get(
    '/refresh',
    passport.authenticate('jwt'),
    authController.refresh
  );

  authRouter.post(
    '/login',
    passport.authenticate('local'),
    authController.login
  );

  authRouter.delete(
    '/logout',
    passport.authenticate('jwt'),
    authController.logout
  );

  authRouter.post('/signup', validator.body(userSchema), authController.signup);

  router.use('/', authRouter);
};

export default createAuthRoutes;
