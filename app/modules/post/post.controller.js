import { STATUS_CODES } from "http";

import { postService } from "./post.service";

export default class PostController {
  async listPosts(req, res) {
    try {
      const posts = await postService.findAllPosts();

      res.end(JSON.stringify(posts));
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }

  async getPost(req, res) {
    try {
      const { id } = req.params;
      const user = await postService.findPostById(id);

      res.end(JSON.stringify(user));
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }

  async getPostByAuthorId(req, res) {
    try {
      const { authorId } = req.params;

      const posts = await postService.findAllPostsByAuthorId(authorId);

      res.end(JSON.stringify(posts));
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const newPost = req.body;

      const updatedPost = await postService.updatePostById(id, newPost);

      res.end(JSON.stringify(updatedPost));
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }

  async deletePost(req, res) {
    try {
      const { id } = req.params;

      await postService.deletePostById(id);
      res.end(STATUS_CODES[200]);
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }
}
