import express from 'express';
import { createValidator } from 'express-joi-validation';

import userController from './user.controller';

import followerSchema from '../follower/follower.schema';

const validator = createValidator();

const createUserRoutes = (router) => {
  const userRouter = express.Router();

  userRouter.get('/', userController.listUsers);
  userRouter.delete('/', userController.deleteAllUsers);

  userRouter.get('/:id', userController.getUser);
  userRouter.patch('/:id', userController.updateUser);
  userRouter.delete('/:id', userController.deleteUser);

  userRouter.get('/:id/followers', userController.getUserFollowers);
  userRouter.post(
    '/:id/followers',
    validator.params(followerSchema.params),
    validator.body(followerSchema.body),
    userController.addFollower
  );

  userRouter.get('/:id/posts', userController.listUserPosts);

  router.use('/users', userRouter);
};

export default createUserRoutes;
