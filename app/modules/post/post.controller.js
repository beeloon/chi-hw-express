import postService from './post.service';

export default class PostController {
  static async addPost(req, res, next) {
    try {
      const { authorId, text } = req.body;

      const createdPost = await postService.createPost(authorId, text);

      return res.json(createdPost);
    } catch (err) {
      next(err);
    }
  }

  static async listPosts(req, res, next) {
    try {
      const posts = await postService.findAllPosts();

      res.json(posts);
    } catch (err) {
      next(err);
    }
  }

  static async getPost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postService.findPostById(id);

      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  static async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      const postUpdateBody = req.body;

      const updatedPost = await postService.updatePostById(id, postUpdateBody);

      res.json(updatedPost);
    } catch (err) {
      next(err);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { id } = req.params;

      await postService.deletePostById(id);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  static async deleteAllPosts(req, res, next) {
    try {
      await postService.deletePosts();

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}
