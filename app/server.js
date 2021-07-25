import config from 'config';
import express from 'express';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import cookieParser from 'cookie-parser';

import database from './database';
import createRouter from './routes';

import passport from './modules/auth/auth.strategies';

const PORT = parseInt(config.get('port')) || 8000;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

createRouter(app);

if (config.get('environment') === 'development') {
  app.use(errorHandler());
}

app.listen(PORT, async () => {
  await database.sequelize.authenticate();
  await database.connectMongoDB();

  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
