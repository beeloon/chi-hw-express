import express from 'express';

import userController from './user.controller';

export const createUserRoutes = (router) => {
  const userRouter = express.Router();

  userRouter.get('/', userController.listUsers);
  userRouter.post('/', userController.signupUser);
  userRouter.delete('/', userController.deleteAllUsers);

  userRouter.get('/:id', userController.getUser);
  userRouter.patch('/:id', userController.updateUser);
  userRouter.delete('/:id', userController.deleteUser);

  userRouter.get('/:id/followers', userController.getUserFollowers);
  userRouter.post('/:id/followers', userController.addFollower);

  router.use('/users', userRouter);
};
