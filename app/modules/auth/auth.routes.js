import express from 'express';
import passport from 'passport';
import usePassportStrategies from './passport-strategies';

import authController from './auth.controller';

usePassportStrategies(passport);

const createAuthRoutes = (router) => {
  const authRouter = express.Router();

  authRouter.post(
    '/',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  router.use('/login', authRouter);
};

export default createAuthRoutes;
