import postService from './post.service';

export default class PostController {
  static async addPost(req, res, next) {
    const { authorId, text } = req.body;

    const createdPost = await postService.createPost(authorId, text);

    return res.json(createdPost);
  }

  static async listPosts(req, res, next) {
    const posts = await postService.findAllPosts();

    res.json(posts);
  }

  static async getPostsByAuthorId(req, res, next) {
    const { authorId } = req.params;
    const posts = await postService.findAllPostsByAuthorId(authorId);

    res.end(JSON.stringify(posts));
  }

  static async getPost(req, res, next) {
    const { id } = req.params;
    const post = await postService.findPostById(id);

    res.json(post);
  }

  static async updatePost(req, res, next) {
    const { id } = req.params;
    const postUpdateBody = req.body;

    const updatedPost = await postService.updatePostById(id, postUpdateBody);

    res.json(updatedPost);
  }

  static async deletePost(req, res, next) {
    const { id } = req.params;

    await postService.deletePostById(id);

    res.sendStatus(200);
  }
}
