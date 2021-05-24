import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import userService from '../user/user.service';

const verifyPassword = async (requestPassword, userPassword) => {
  return await bcrypt.compare(requestPassword, userPassword);
};

export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((userId, done) => {
    try {
      const user = userService.findUserById(userId);

      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await userService.findUserByEmail({ where: { email } });

        if (user === null) {
          return done(null, false);
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};
