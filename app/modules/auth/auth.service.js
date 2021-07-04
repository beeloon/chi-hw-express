import { BadRequest } from '../../errors';

import tokenService from './token/token-service';

class AuthService {
  async issueTokenPair(userPayload) {
    const tokens = await tokenService.generateTokens(userPayload);

    return tokens;
  }

  async login(user) {
    try {
      console.log(user);
    } catch (err) {
      throw new BadRequest(err, 500);
    }
  }

  async logout(username, password) {
    try {
    } catch (err) {
      throw new BadRequest(err, 500);
    }
  }

  async refresh(username, password) {
    try {
    } catch (err) {
      throw new BadRequest(err, 500);
    }
  }

  async signup(username, password) {
    try {
    } catch (err) {
      throw new BadRequest(err, 500);
    }
  }
}

export default new AuthService();
