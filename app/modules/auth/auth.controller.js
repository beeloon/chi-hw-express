import authService from './auth.service';

import { setCookie } from '../../utils';

import { BadRequest } from '../../errors';

class AuthController {
  async login(req, res) {
    const tokens = await authService.login(req.user);

    setCookie(res, tokens.refreshToken);

    res.json(tokens);
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;
    const statusOfTokenDeletion = await authService.logout(refreshToken);

    if (statusOfTokenDeletion == 200) {
      res.clearCookie('refreshToken');
    }

    res.sendStatus(statusOfTokenDeletion);
  }

  async refresh(req, res) {
    const { refreshToken } = req.cookies;
    const tokens = await authService.refresh(refreshToken);

    setCookie(res, tokens.refreshToken);

    res.json(tokens);
  }

  async signup(req, res) {
    const tokens = await authService.signup(req.body);

    setCookie(res, tokens.refreshToken);

    res.json(tokens);
  }
}

export default new AuthController();
