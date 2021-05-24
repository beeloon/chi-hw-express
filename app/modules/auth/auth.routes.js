import express from 'express';
import passport from 'passport';
import usePassportStrategies from './passport-strategies';

import authController from './auth.controller';

usePassportStrategies(passport);

const createAuthRoutes = (router) => {
  const authRouter = express.Router();

  authRouter.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/api/auth/login' }),
    (req, res) => {
      res.redirect('/api/users');
    }
  );

  router.use('/auth', authRouter);
};

export default createAuthRoutes;
