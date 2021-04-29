import { resolve } from "path";
import { writeFile, readFile, access, mkdir } from "fs/promises";

export default class DBFileManager {
  constructor(path, file) {
    this.path = path;
    this.file = file;
  }

  async addEntityToFile(entityData) {
    const fileContent = await this.getFileContent(this.file);

    await this.setFileContent(
      this.file,
      JSON.stringify([...fileContent, entityData])
    );

    return entityData;
  }

  async getEntityFromFileById(id) {
    const fileContent = await this.getFileContent(this.file);

    const result = fileContent.find((entity) => entity.id === id);

    if (result) {
      return result;
    } else {
      throw new Error(`The entity with id ${id} doesn't exist.`);
    }
  }

  async getAllEntitiesFromFile() {
    const fileContent = await this.getFileContent(this.file);

    return fileContent;
  }

  async updateEntityById(id, newData) {
    const fileContent = await this.getFileContent(this.file);

    const newContent = fileContent.map((entity) => {
      if (entity.id === id) {
        return {
          id,
          ...newData,
        };
      }

      return entity;
    });

    await this.setFileContent(this.file, JSON.stringify(newContent));

    return { id, ...newData };
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

  async getFileContent(filename) {
    const pathToFile = resolve(this.path, `${filename}.json`);

    try {
      const fileContent = await readFile(pathToFile, "utf-8");

      return JSON.parse(fileContent);
    } catch (err) {
      throw new Error(err);
    }
  }

  async setFileContent(filename, content) {
    const pathToFile = resolve(this.path, `${filename}.json`);

    try {
      await writeFile(pathToFile, content);

      return content;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async init(path, ...entities) {
    await this.initializeDirectory(path);
    const fileNames = entities.map((entity) => entity.DBName);

    for (let file of fileNames) {
      await this.initializeFile(path, file);
    }
  }

  static async initializeFile(path, file) {
    const filePath = resolve(path, `${file}.json`);

    try {
      await access(filePath);
    } catch (err) {
      await writeFile(filePath, "[]");
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
}
