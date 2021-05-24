import express from 'express';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import passport from 'passport';
import session from 'express-session';
import mongoStore from 'connect-mongo';

import database from './database';
import createRouter from './routes';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1800000, // 30 min
    },
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: 'api-server',
      collectionName: 'sessions',
    }),
  })
);

app.use(logger('dev'));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

createRouter(app);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

app.listen(PORT, async () => {
  await database.sequelize.authenticate();
  await database.connectMongoDB();

  console.log(`Server running at http://localhost:${PORT}`);
});
