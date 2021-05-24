import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import database from '../../database';

const { User: userModel } = database.models;

const verifyPassword = async (requestPassword, userPassword) => {
  return await bcrypt.compare(requestPassword, userPassword);
};

export default (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await userModel.findOne({ where: { username } });

        if (user === null) {
          return done(null, false);
        }

        if (await verifyPassword(password, user.password)) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};
