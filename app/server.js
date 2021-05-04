import express from "express";

import config from "./config";
import { initializeDB } from "./utils";
import { createRouter } from "./routes";
import { requestLogger } from "./middleware";

const PORT = config.serverPort;
const app = express();

app.use(requestLogger);
app.use(express.json());

createRouter(app);

const startServer = async () => {
  await initializeDB();

  app.listen(PORT, console.log(`Server running at http://localhost:${PORT}`));
};

startServer();
