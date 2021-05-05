import postModel from './post.model';

class PostService {
  constructor() {
    this.postModel = postModel;
  }

  createPost(postData) {
    return this.postModel.create(postData);
  }

  findPostById(postId) {
    return this.postModel.findOne(postId);
  }

  async findAllPostsByAuthorId(authorId) {
    const posts = await this.postModel.findAll();

    return posts.filter((post) => post.authorId === authorId);
  }

  findAllPosts() {
    return this.postModel.findAll();
  }

  updatePostById(postId, newPostData) {
    return this.postModel.updateOne(postId, newPostData);
  }

  deletePostById(postId) {
    return this.postModel.deleteOne(postId);
  }

  deleteAllPosts(authorId) {
    return this.postModel.deleteManyById(authorId);
  }
}

const postService = new PostService();

export default postService;
