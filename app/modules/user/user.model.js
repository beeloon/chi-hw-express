import { v4 as uuid } from 'uuid';

import Entity from '../../lib/Entity';

class User extends Entity {
  create(userData) {
    const id = uuid();

    return this.repository.addEntityToFile({ id, ...userData });
  }

  findOne(id) {
    return this.repository.getEntityFromFileById(id);
  }

  findAll() {
    return this.repository.getAllEntitiesFromFile();
  }

  updateOne(id, data) {
    return this.repository.updateEntityById(id, data);
  }

  deleteOne(id) {
    return this.repository.deleteEntityFromFile(id);
  }
}

const userModel = new User('users');

export default userModel;
