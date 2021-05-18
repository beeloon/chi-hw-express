import database from '../../database';

import RequestError from '../../lib/RequestError';

const {
  User: userModel,
  Follower: followerModel,
  Post: postModel,
} = database.models;

export default class UserService {
  static async createUser(userData) {
    try {
      const { username, password, email } = userData;

      const user = await userModel.create({ username, password, email });

      return user;
    } catch (err) {
      throw new RequestError(err, 500);
    }
  }

  static async addFollowerForUser(followerId, targetId) {
    try {
      const follower = await followerModel.findAll({
        where: { followerId, targetId },
      });

      if (follower.length) {
        throw new Error('Follower already send request to the user');
      }

      await followerModel.create({
        followerId,
        targetId,
        status: 'pending',
      });
    } catch (err) {
      throw new RequestError(err, 500);
    }
  }

  static async deleteUserById(userId) {
    const deletedUser = await userModel.destroy({ where: { id: userId } });

    return deletedUser;
  }

  static async deleteUsers() {
    try {
      await userModel.destroy({ where: {} });
    } catch (err) {
      throw new RequestError(err, 500);
    }
  }

  static async findUserById(userId) {
    try {
      const user = await userModel.findByPk(userId);

      if (!user) {
        throw new Error(`User with id ${userId} doesn't exist.`);
      }

      return user;
    } catch (err) {
      throw new RequestError(err, 404);
    }
  }

  static async findAllUsers() {
    try {
      const userList = await userModel.findAll();

      return userList;
    } catch (err) {
      throw new RequestError(err, 404);
    }
  }

  static async getUserPosts(authorId) {
    try {
      const user = await this.findUserById(authorId);
      const userPostList = postModel.findAll({ where: { authorId: user.id } });

      return userPostList;
    } catch (err) {
      throw new RequestError(err, 404);
    }
  }

  static async getFollowersByUserId(userId) {
    try {
      const followers = await followerModel.findAll({
        where: { targetId: userId },
      });

      return followers;
    } catch (err) {
      throw new RequestError(err, 404);
    }
  }

  static async updateUserById(userId, userUpdateBody) {
    try {
      const updatedUser = await userModel.update(userUpdateBody, {
        where: { id: userId },
      });

      return updatedUser;
    } catch (err) {
      throw new RequestError(err, 404);
    }
  }
}
