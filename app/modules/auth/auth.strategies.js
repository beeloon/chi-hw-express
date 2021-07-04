import config from 'config';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { verifyPassword } from '../../utils';

import userService from '../user/user.service';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('token.access.secret'),
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
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await userService.findUserByEmail(email);

          if (!user) {
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
      }
    )
  );

  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        const user = await userService.findUserById(payload.id);
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
