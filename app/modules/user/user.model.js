import { v4 as uuid } from "uuid";

import Entity from "../../lib/Entity";

class User extends Entity {
  async create(userData) {
    const id = uuid();

    await this.repository.addEntityToFile({ id, ...userData });
  }

  async findOne(id) {
    return await this.repository.getEntityFromFileById(id);
  }

  async findAll() {
    return await this.repository.getAllEntitiesFromFile();
  }

  async updateOne(id, data) {
    return await this.repository.updateEntityById(id, data);
  }

  async deleteOne(id) {
    await this.repository.deleteEntityFromFile(id);
  }
}

export const user = new User("users");
