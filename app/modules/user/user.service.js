import userModel from './user.model';

class UserService {
  constructor() {
    this.userModel = userModel;
  }

  async createUser(userData) {
    await this.userModel.create(userData);
  }

  async findUserById(userId) {
    const user = await this.userModel.findOne(userId);

    return user;
  }

  async findAllUsers() {
    const userList = await this.userModel.findAll();

    return userList;
  }

  async updateUserById(userId, newUserData) {
    const updatedUser = await this.userModel.updateOne(userId, newUserData);

    return updatedUser;
  }

  async deleteUserById(userId) {
    await this.userModel.deleteOne(userId);
  }
}

const userService = new UserService();

export default userService;
