import config from 'config';

import { BadRequest, NotFoundException } from '../../errors';
import userService from '../user/user.service';

import tokenService from './token/token-service';

class AuthService {
  async issueTokenPair(user) {
    const payload = { id: user.id, email: user.email, username: user.username };

    const accessToken = tokenService.generateToken(
      payload,
      config.get('token.access.secret'),
      config.get('token.access.expiresIn')
    );

    let refreshToken;
    const existedRefreshToken = await tokenService.find({ userId: payload.id });
    if (existedRefreshToken) {
      refreshToken = existedRefreshToken.value;
    } else {
      refreshToken = tokenService.generateToken(
        payload,
        config.get('token.refresh.secret'),
        config.get('token.refresh.expiresIn')
      );

      tokenService.create(payload.id, refreshToken);
    }

    return { accessToken, refreshToken };
  }

  async login(user) {
    const tokens = await this.issueTokenPair(user);

    return tokens;
  }

  async logout(refreshToken) {
    const isTokenDeleted = await tokenService.delete(refreshToken);

    return isTokenDeleted ? 200 : 204;
  }

  async refresh(refreshToken) {
    const dbToken = await tokenService.find({ value: refreshToken });
    if (!dbToken) {
      throw new NotFoundException('RefreshToken Not Found');
    }

    const jwtPayload = tokenService.validate(refreshToken);
    const user = await userService.findUserById(jwtPayload.id);
    if (!user) {
      throw new NotFoundException(`User with id: ${jwtPayload.id} not found.`);
    }

    const tokens = await this.issueTokenPair(user);
    return tokens;
  }

  async signup(createUserDto) {
    const user = await userService.createUser(createUserDto);
    const tokens = await this.issueTokenPair(user);

    return tokens;
  }
}

export default new AuthService();
