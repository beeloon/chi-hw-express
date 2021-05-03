import express from "express";

import PostController from "../modules/post/post.controller";

export const createPostRoutes = (router) => {
  const postRouter = express.Router();
  const postController = new PostController();

  postRouter.get("/", postController.listPosts);
  postRouter.get("/:id", postController.getPost);

  postRouter.patch("/:id", postController.updatePost);
  postRouter.delete("/:id", postController.deletePost);

  postRouter.get("/user/:authorId", postController.getPostsByAuthorId);

  router.use("/posts", postRouter);
};
