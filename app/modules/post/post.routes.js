import express from 'express';
import { createValidator } from 'express-joi-validation';

import postController from './post.controller';
import postSchema from './post.schema';

const validator = createValidator();

export const createPostRoutes = (router) => {
  const postRouter = express.Router();

  postRouter.get('/', postController.listPosts);
  postRouter.post('/', validator.body(postSchema), postController.addPost);
  postRouter.delete('/', postController.deleteAllPosts);

  postRouter.get('/:id', postController.getPost);
  postRouter.patch('/:id', postController.updatePost);
  postRouter.delete('/:id', postController.deletePost);

  router.use('/posts', postRouter);
};
