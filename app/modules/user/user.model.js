import { config } from "../../config";
import DBFileManager from "../../lib/DBFileManager";

class User {
  #DBName = "users";

  constructor() {
    this.repository = new DBFileManager(config.pathToDBFolder, this.#DBName);
  }

  getDBName() {
    return this.#DBName;
  }

  async init() {
    await this.repository.init();
  }

  async create(userData) {
    await this.repository.addEntityToFile(userData);
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

export const user = new User();
