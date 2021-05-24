import database from '../../database';

import ApplicationError from '../../lib/ApplicationError';
import userService from '../user/user.service';

const { Post: postModel } = database.models;

export default class PostService {
  static async createPost(authorId, text) {
    try {
      const author = await userService.findUserById(authorId);
      const post = await postModel.create({ text, authorId: author.id });

      return post;
    } catch (err) {
      throw new ApplicationError(err, 500);
    }
  }

  static async deletePostById(postId) {
    try {
      await this.findPostById(postId);
      await postModel.destroy({ where: { id: postId } });
    } catch (err) {
      throw new ApplicationError(err, 500);
    }
  }

  static async deletePosts() {
    try {
      await postModel.destroy({ where: {} });
    } catch (err) {
      throw new ApplicationError(err, 500);
    }
  }

  static async findAllPosts() {
    try {
      const postList = await postModel.findAll();

      return postList;
    } catch (err) {
      throw new ApplicationError(err, 500);
    }
  }

  static async findPostById(postId) {
    try {
      const post = await postModel.findByPk(postId);

      if (post === null) {
        throw new Error(`Post with id ${postId} doesn't exist.`);
      }

      return post;
    } catch (err) {
      throw new ApplicationError(err, 404);
    }
  }

  static async updatePostById(postId, postUpdateBody) {
    try {
      const post = await this.findPostById(postId);
      const updatedPost = await postModel.update(postUpdateBody, {
        where: { id: post.id },
      });

      return updatedPost;
    } catch (err) {
      throw new ApplicationError(err, 500);
    }
  }
}
