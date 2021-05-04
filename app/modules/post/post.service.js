import postModel from './post.model';

class PostService {
  constructor() {
    this.postModel = postModel;
  }

  async createPost(postData) {
    await this.postModel.create(postData);
  }

  async findPostById(postId) {
    const post = await this.postModel.findOne(postId);

    return post;
  }

  async findAllPostsByAuthorId(authorId) {
    const posts = await this.postModel.findAll();

    return posts.filter((post) => post.authorId === authorId);
  }

  async findAllPosts() {
    const postList = await this.postModel.findAll();

    return postList;
  }

  async updatePostById(postId, newPostData) {
    const updatedPost = await this.postModel.updateOne(postId, newPostData);

    return updatedPost;
  }

  async deletePostById(postId) {
    await this.postModel.deleteOne(postId);
  }

  async deleteAllPosts(authorId) {
    await this.postModel.deleteManyById(authorId);
  }
}

const postService = new PostService();

export default postService;
