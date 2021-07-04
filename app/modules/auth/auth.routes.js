import express from 'express';
import passport from 'passport';
import { createValidator } from 'express-joi-validation';

import authController from './auth.controller';
import usePassportStrategies from './auth.strategies';

import userSchema from '../user/user.schema';

usePassportStrategies(passport);

const validator = createValidator();

const createAuthRoutes = (router) => {
  const authRouter = express.Router();

  authRouter.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/api/auth/login' }),
    authController.login
  );

  authRouter.delete(
    '/logout',
    passport.authenticate('local', { failureRedirect: '/api/auth/login' }),
    authController.logout
  );

  authRouter.get(
    '/refresh',
    passport.authenticate('local', { failureRedirect: '/api/auth/login' }),
    authController.refresh
  );

  authRouter.post('/signup', validator.body(userSchema), authController.signup);

  router.use('/', authRouter);
};

export default createAuthRoutes;
