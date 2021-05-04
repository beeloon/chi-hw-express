import config from "../config";
import DBFileManager from "../lib/DBFileManager";

import userModel from "../modules/user/user.model";
import postModel from "../modules/post/post.model";

export const initializeDB = async () => {
  await DBFileManager.init(config.pathToDBFolder, userModel, postModel);
};
