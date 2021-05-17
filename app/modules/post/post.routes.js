import express from 'express';

import postController from './post.controller';

export const createPostRoutes = (router) => {
  const postRouter = express.Router();

  postRouter.post('/', postController.addPost);
  postRouter.get('/', postController.listPosts);

  postRouter.get('/:id', postController.getPost);
  postRouter.patch('/:id', postController.updatePost);
  postRouter.delete('/:id', postController.deletePost);

  router.use('/posts', postRouter);
};
