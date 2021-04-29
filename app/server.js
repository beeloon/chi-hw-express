import express from "express";

import { config } from "./config";
import { initializeDB } from "./config/db";
import { createRouter } from "./routes";

initializeDB();

const PORT = config.serverPort;
const app = express();

app.use(express.json());

createRouter(app);

app.listen(PORT, console.log(`Server running at http://localhost:${PORT}`));
