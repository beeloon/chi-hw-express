import authService from './auth.service';
import userService from '../user/user.service';

import { setCookie } from '../../utils';

import { BadRequest } from '../../errors';

class AuthController {
  async login(req, res) {
    const tokens = await authService.login(req.user);

    setCookie(res, tokens.refreshToken);

    res.json(tokens);
  }

  async logout(req, res) {
    try {
    } catch (err) {
      throw new BadRequest(err, 500);
    }
  }

  async refresh(req, res) {
    try {
    } catch (err) {
      throw new BadRequest(err, 500);
    }
  }

  async signup(req, res) {
    const tokens = await authService.signup(req.body);

    setCookie(res, tokens.refreshToken);

    res.json(tokens);
  }
}

export default new AuthController();
