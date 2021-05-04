import { v4 as uuid } from 'uuid';

import Entity from '../../lib/Entity';

class User extends Entity {
  async create(userData) {
    const id = uuid();

    await this.repository.addEntityToFile({ id, ...userData });
  }

  async findOne(id) {
    const user = await this.repository.getEntityFromFileById(id);

    if (!user) {
      throw new Error(`The entity with id ${id} doesn't exist.`);
    }

    return user;
  }

  async findAll() {
    const userList = await this.repository.getAllEntitiesFromFile();

    return userList;
  }

  async updateOne(id, data) {
    const updatedUser = await this.repository.updateEntityById(id, data);

    return updatedUser;
  }

  async deleteOne(id) {
    await this.repository.deleteEntityFromFile(id);
  }
}

const userModel = new User('users');

export default userModel;
