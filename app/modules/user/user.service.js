import database from '../../database';

import { BadRequest, ConflictError } from '../../errors';

const {
  User: userModel,
  Follower: followerModel,
  Post: postModel,
} = database.models;

class UserService {
  async addFollowerForUser(followerId, targetId) {
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
      throw new BadRequest(err, 500);
    }
  }

  async createUser(createUserDto) {
    try {
      const user = await userModel.create(createUserDto);

      return user;
    } catch (err) {
      throw new ConflictError(err.message);
    }
  }

  async deleteUsers() {
    try {
      await userModel.destroy({ where: {} });
    } catch (err) {
      throw new BadRequest(err, 500);
    }
  }

  async deleteUserById(userId) {
    try {
      await this.findUserById(userId);
      await userModel.destroy({ where: { id: userId } });
    } catch (err) {
      throw new BadRequest(err, 500);
    }
  }

  async findAllUsers() {
    try {
      const userList = await userModel.findAll();

      return userList;
    } catch (err) {
      throw new BadRequest(err, 500);
    }
  }

  async findUserById(userId) {
    try {
      const user = await userModel.findByPk(userId);

      if (user === null) {
        throw new Error(`User with id ${userId} doesn't exist.`);
      }

      return user;
    } catch (err) {
      throw new ConflictError(err, 404);
    }
  }

  async findUserByEmail(userEmail) {
    try {
      const user = await userModel.findOne({
        where: { email: userEmail },
      });

      if (user === null) {
        throw new Error(`User with id ${userId} doesn't exist.`);
      }

      return user;
    } catch (err) {
      throw new ConflictError(err, 404);
    }
  }

  async getUserPosts(authorId) {
    try {
      const user = await this.findUserById(authorId);
      const userPostList = postModel.findAll({
        where: { authorId: user.id },
      });

      return userPostList;
    } catch (err) {
      throw new ConflictError(err, 404);
    }
  }

  async getFollowersByUserId(userId) {
    try {
      const user = await this.findUserById(userId);
      const followers = await followerModel.findAll({
        where: { targetId: user.id },
      });

      return followers;
    } catch (err) {
      throw new ConflictError(err, 500);
    }
  }

  async updateUserById(userId, userUpdateBody) {
    try {
      const user = await this.findUserById(userId);
      const updatedUser = await userModel.update(userUpdateBody, {
        where: { id: user.id },
      });

      return updatedUser;
    } catch (err) {
      throw new ConflictError(err, 500);
    }
  }
}

export default new UserService();
