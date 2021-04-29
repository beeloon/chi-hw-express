import { post } from "./post.model";

class PostService {
  constructor() {
    this.post = post;
  }

  async createPost(postData) {
    console.log(
      `POST /api/users/id :: Create new post for user with id: ${postData.authorId}`
    );

    await this.post.create(postData);
  }

  async findPostById(postId) {
    console.log(`GET /api/post/:id :: Get single post by id: ${postId}`);

    return await this.post.findOne(postId);
  }

  async findAllPostsByAuthorId(authorId) {
    console.log(
      `GET /api/post/:authorId :: Get single post by id: ${authorId}`
    );

    const posts = await this.post.findAll();

    return posts.filter((post) => post.authorId === authorId);
  }

  async findAllPosts() {
    console.log(`GET /api/post :: Get all posts from db`);

    return await this.post.findAll();
  }

  async updatePostById(postId, newPostData) {
    console.log(`PATCH /api/post/:id :: Update single post by id: ${postId}`);

    return await this.post.updateOne(postId, newPostData);
  }

  async deletePostById(postId) {
    console.log(`DELETE /api/post/:id :: Delete single post by id: ${postId}`);

    await this.post.deleteOne(postId);
  }

  async deleteAllPosts(authorId) {
    console.log(`Delete all posts from a user with id: ${authorId}`);

    await this.post.deleteManyById(authorId);
  }
}

export const postService = new PostService();
