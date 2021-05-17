import express from 'express';
import UserController from './user.controller';
import { createValidator } from 'express-joi-validation';

import userController from './user.controller';
import userSchema from './user.schema';

const validator = createValidator();

export const createUserRoutes = (router) => {
  const userRouter = express.Router();

  userRouter.get('/', userController.listUsers);
  userRouter.post('/', validator.body(userSchema), userController.signupUser);
  userRouter.delete('/', userController.deleteAllUsers);

  userRouter.get('/:id', userController.getUser);
  userRouter.patch('/:id', userController.updateUser);
  userRouter.delete('/:id', userController.deleteUser);

  userRouter.get('/:id/followers', userController.getUserFollowers);
  userRouter.post('/:id/followers', userController.addFollower);

  userRouter.get('/:id/posts', UserController.listUserPosts);

  router.use('/users', userRouter);
};
