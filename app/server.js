import express from "express";

import { config } from "./config";
import DBFileManager from "./lib/DBFileManager";

import { user as UserModel } from "./modules/user/user.model";

import { createRouter } from "./routes";

DBFileManager.init(config.pathToDBFolder, UserModel);

const PORT = config.serverPort;
const app = express();

app.use(express.json());

createRouter(app);

app.listen(PORT, console.log(`Server running at http://localhost:${PORT}`));
