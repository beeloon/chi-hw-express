import express from "express";

import { config } from "./config/common.js";
import DBFileManager from "./lib/DBFileManager.js";

import { user as UserModel } from "./modules/user/user.model.js";

import userRouter from "./routes/user.js";

DBFileManager.init(config.pathToDBFolder, UserModel);

const PORT = config.serverPort;
const app = express();

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(PORT, console.log(`Server running at http://localhost:${PORT}`));
