import config from 'config';
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

  async delete(refreshToken) {
    try {
      const { deletedCount } = await refreshTokenModel.deleteOne({
        value: refreshToken,
      });

      return deletedCount > 0;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  validate(token) {
    try {
      return jwt.verify(token, config.get('token.refresh.secret'));
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

export default new TokenService();
