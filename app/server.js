import express from 'express';

import database from './database';
import { createRouter } from './routes';
import { requestLogger } from './middlewares';

const PORT = process.env.PORT;
const app = express();

app.use(requestLogger);
app.use(express.json());

createRouter(app);

app.listen(PORT, async () => {
  await database.sequelize.authenticate();

  console.log(`Server running at http://localhost:${PORT}`);
});
