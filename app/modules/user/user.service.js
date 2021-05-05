import userModel from './user.model';

class UserService {
  constructor() {
    this.userModel = userModel;
  }

  createUser(userData) {
    return this.userModel.create(userData);
  }

  async findUserById(userId) {
    const user = await this.userModel.findOne(userId);

    if (!user) {
      throw new Error(`User with id ${id} doesn't exist.`);
    }

    return user;
  }

  findAllUsers() {
    return this.userModel.findAll();
  }

  updateUserById(userId, newUserData) {
    return this.userModel.updateOne(userId, newUserData);
  }

  deleteUserById(userId) {
    return this.userModel.deleteOne(userId);
  }
}

const userService = new UserService();

export default userService;
