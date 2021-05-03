import config from "../config";
import DBFileManager from "../lib/DBFileManager";

import { user as UserModel } from "../modules/user/user.model";
import { post as PostModel } from "../modules/post/post.model";

export const initializeDB = async () => {
  await DBFileManager.init(config.pathToDBFolder, UserModel, PostModel);
};
