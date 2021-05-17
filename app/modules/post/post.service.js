import database from '../../database';

const { Post: postModel, User: userModel } = database.models;

export default class PostService {
  static async createPost(authorId, text) {
    const author = await userModel.findOne({ where: { id: authorId } });
    const post = await postModel.create({ text, authorId: author.id });

    return post;
  }

  static async findAllPosts() {
    const postList = await postModel.findAll();

    return postList;
  }

  static async findPostById(postId) {
    const post = await postModel.findOne({ where: { id: postId } });

    return post;
  }

  static async findAllPostsByAuthorId(authorId) {
    const author = await userModel.findOne({ where: { id: authorId } });
    const posts = await postModel.findAll({ where: { authorId: author.id } });

    return posts;
  }

  static async updatePostById(postId, postUpdateBody) {
    const updatedPost = await postModel.update(postUpdateBody, {
      where: { id: postId },
    });

    return updatedPost;
  }

  static async deletePostById(postId) {
    const deletedPost = await postModel.destroy({ where: { id: postId } });

    return deletedPost;
  }

  static async deleteAllPosts() {
    await postModel.destroy({ where: {} });
  }
}
