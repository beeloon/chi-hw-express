import { v4 as uuid } from "uuid";

import Entity from "../../lib/Entity";

class Post extends Entity {
  async create(postData) {
    const id = uuid();

    await this.repository.addEntityToFile({ id, ...postData });
  }

  async findOne(id) {
    const post = await this.repository.getEntityFromFileById(id);

    return post;
  }

  async findAll() {
    const postList = await this.repository.getAllEntitiesFromFile();

    return postList;
  }

  async updateOne(id, data) {
    const updatedPost = await this.repository.updateEntityById(id, data);

    return updatedPost;
  }

  async deleteOne(id) {
    await this.repository.deleteEntityFromFile(id);
  }

  async deleteManyById(authorId) {
    await this.repository.deleteAllEntitiesBy(["authorId", authorId]);
  }
}

const postModel = new Post("posts");

export default postModel;
