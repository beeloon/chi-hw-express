import authService from './auth.service';
import userService from '../user/user.service';
import { setCookie } from '../../utils';

import { BadRequest } from '../../errors';

class AuthController {
  async login(req, res) {
    try {
    } catch (err) {
      throw new BadRequest(err, 500);
    }
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
    const user = await userService.createUser(req.body);
    setCookie(res, 'RANDOM TOKEN');
    res.json(user);
  }
}

export default new AuthController();
