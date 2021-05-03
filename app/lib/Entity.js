import config from "../config";
import DBFileManager from "./DBFileManager";

class Entity {
  constructor(DBName) {
    this.DBName = DBName;
    this.repository = new DBFileManager(config.pathToDBFolder, this.DBName);
  }

  getDBName() {
    return this.DBName;
  }
}

export default Entity;
