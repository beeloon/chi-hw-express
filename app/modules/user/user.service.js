import { v4 as uuid } from "uuid";

import { user } from "./user.model.js";

class UserService {
  constructor() {
    this.user = user;
  }

  async createUser(userData) {
    console.log(`POST /user :: Create new user with name: ${userData.name}`);

    const id = uuid();
    const newUser = { ...userData, id };

    await this.user.create(newUser);
  }

  async findUserById(userId) {
    console.log(`GET /user/:id :: Get single user by id: ${userId}`);

    return await this.user.findOne(userId);
  }

  async findAllUsers() {
    console.log(`GET /user :: Get all users from db`);

    return await this.user.findAll();
  }

  async updateUserById(userId, newUserData) {
    console.log(`PATCH /user/:id :: Update single user by id: ${userId}`);

    return await this.user.updateOne(userId, newUserData);
  }

  async deleteUserById(userId) {
    console.log(`DELETE /user/:id :: Delete single user by id: ${userId}`);

    await this.user.deleteOne(userId);
  }
}

export const userService = new UserService();
