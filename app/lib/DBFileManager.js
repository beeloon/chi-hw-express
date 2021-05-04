import { resolve } from 'path';
import { writeFile, readFile, access, mkdir } from 'fs/promises';

export default class DBFileManager {
  constructor(path, file) {
    this.path = path;
    this.file = file;
  }

  static async init(path, ...entities) {
    await this.initializeDirectory(path);

    const fileNames = entities.map((entity) => entity.getDBName());
    for (let file of fileNames) {
      await this.initializeFile(path, file);
    }
  }

  static async initializeFile(path, file) {
    const filePath = resolve(path, `${file}.json`);

    try {
      await access(filePath);
    } catch (err) {
      await writeFile(filePath, '[]');
    }
  }

  static async initializeDirectory(path) {
    const pathToDir = resolve(path);

    try {
      await access(pathToDir);
    } catch (err) {
      await mkdir(pathToDir);
    }
  }

  async addEntityToFile(entityData) {
    const fileContent = await this.getFileContent(this.file);

    await this.setFileContent(
      this.file,
      JSON.stringify([...fileContent, entityData])
    );

    return entityData;
  }

  async deleteEntityFromFile(id) {
    const fileContent = await this.getFileContent(this.file);
    const newContent = fileContent.filter((entity) => entity.id !== id);

    await this.setFileContent(this.file, JSON.stringify(newContent));
  }

  async deleteAllEntitiesBy(property = null) {
    if (property) {
      const [propName, propValue] = property;

      const fileContent = await this.getFileContent(this.file);
      const filteredContent = fileContent.filter(
        (entity) => entity[propName] !== propValue
      );

      await this.setFileContent(this.file, JSON.stringify(filteredContent));
    } else {
      await this.setFileContent(this.file, JSON.stringify([]));
    }
  }

  async getEntityFromFileById(id) {
    const fileContent = await this.getFileContent(this.file);

    return fileContent.find((entity) => entity.id === id);
  }

  async getAllEntitiesFromFile() {
    const fileContent = await this.getFileContent(this.file);

    return fileContent;
  }

  async getFileContent(filename) {
    const pathToFile = resolve(this.path, `${filename}.json`);

    try {
      return JSON.parse(await readFile(pathToFile, 'utf-8'));
    } catch (err) {
      throw new Error(err);
    }
  }

  async setFileContent(filename, content) {
    const pathToFile = resolve(this.path, `${filename}.json`);

    try {
      await writeFile(pathToFile, content);
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateEntityById(id, newData) {
    const fileContent = await this.getFileContent(this.file);

    const newContent = fileContent.map((entity) =>
      entity.id === id
        ? {
            id,
            ...entity,
            ...newData,
          }
        : entity
    );

    await this.setFileContent(this.file, JSON.stringify(newContent));

    return { id, ...newData };
  }
}
