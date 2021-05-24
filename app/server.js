import express from 'express';
import logger from 'morgan';
import errorHandler from 'errorhandler';

import database from './database';
import createRouter from './routes';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(logger('dev'));
app.use(express.json());

createRouter(app);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

app.listen(PORT, async () => {
  await database.sequelize.authenticate();

  console.log(`Server running at http://localhost:${PORT}`);
});
