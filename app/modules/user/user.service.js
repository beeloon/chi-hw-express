import database from '../../database';

const {
  User: userModel,
  Follower: followerModel,
  Post: postModel,
} = database.models;

export default class UserService {
  static async createUser(userData) {
    const { username, email } = userData;

    const user = await userModel.create({ username, email });

    return user;
  }

  static async createFollowerForUser(followerId, targetId) {
    await followerModel.create({
      followerId,
      targetId,
      status: 'pending',
    });
  }

  static async deleteUserById(userId) {
    const deletedUser = await userModel.destroy({ where: { id: userId } });

    return deletedUser;
  }

  static async deleteUsers() {
    await userModel.destroy({ where: {} });
  }

  static async findUserById(userId) {
    const user = await userModel.findByPk(userId);

    if (!user) {
      throw new Error(`User with id ${id} doesn't exist.`);
    }

    return user;
  }

  static async findAllUsers() {
    const userList = await userModel.findAll();

    return userList;
  }

  static async getUserPosts(authorId) {
    const user = await this.findUserById(authorId);
    const userPostList = postModel.findAll({ where: { authorId: user.id } });

    return userPostList;
  }

  static async getFollowersByUserId(userId) {
    const followers = await followerModel.findAll({
      where: { targetId: userId },
    });

    return followers;
  }

  static async updateUserById(userId, userUpdateBody) {
    const updatedUser = await userModel.update(userUpdateBody, {
      where: { id: userId },
    });

    return updatedUser;
  }
}
