import jwt from 'jsonwebtoken';

import refreshTokenModel from './token.model';

class TokenService {
  generateToken(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  async find(option) {
    try {
      return await refreshTokenModel.findOne(option);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async create(userId, refreshToken) {
    try {
      return await refreshTokenModel.create({ userId, value: refreshToken });
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async remove(refreshToken) {
    try {
      const { affected: numberOfDeletedRows } = await refreshTokenModel.delete({
        value: refreshToken,
      });

      return numberOfDeletedRows > 0;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async validate(token) {
    try {
      const refreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
      const userInfo = await jwt.verifyAsync(token, {
        secret: refreshSecret,
      });

      return userInfo;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

export default new TokenService();
