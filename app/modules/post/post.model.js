import { v4 as uuid } from 'uuid';

import Entity from '../../lib/Entity';

class Post extends Entity {
  create(postData) {
    const id = uuid();

    return this.repository.addEntityToFile({ id, ...postData });
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

  async deleteManyById(authorId) {
    return this.repository.deleteAllEntitiesBy(['authorId', authorId]);
  }
}

const postModel = new Post('posts');

export default postModel;
