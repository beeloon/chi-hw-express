import { v4 as uuid } from "uuid";

import { config } from "../../config";
import DBFileManager from "../../lib/DBFileManager";

class Post {
  DBName = "posts";

  get DBName() {
    return this.DBName;
  }

  constructor() {
    this.repository = new DBFileManager(config.pathToDBFolder, this.DBName);
  }

  async create(postData) {
    const id = uuid();

    await this.repository.addEntityToFile({ id, ...postData });
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

  async deleteManyById(authorId) {
    await this.repository.deleteAllEntitiesBy(["authorId", authorId]);
  }
}

export const post = new Post();
