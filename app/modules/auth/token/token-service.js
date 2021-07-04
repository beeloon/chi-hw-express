class TokenService {
  async generateTokens(payload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('tokens.access.secret'),
      expiresIn: this.configService.get('tokens.access.expiresIn'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('tokens.refresh.secret'),
      expiresIn: this.configService.get('tokens.refresh.expiresIn'),
    });

    await this.save(payload.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async find(options) {
    try {
      return await this.refreshTokenRepository.findOne(options);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async save(userId, refreshToken) {
    const tokenData = await this.find({ user_id: userId });

    if (tokenData) {
      return tokenData;
    }

    try {
      const token = await this.refreshTokenRepository.save({
        user_id: userId,
        value: refreshToken,
      });

      return token;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async remove(refreshToken) {
    try {
      const {
        affected: numberOfDeletedRows,
      } = await this.refreshTokenRepository.delete({
        value: refreshToken,
      });

      return numberOfDeletedRows > 0;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async validate(token) {
    try {
      const refreshSecret = this.configService.get('tokens.refresh.secret');
      const userInfo = await this.jwtService.verifyAsync(token, {
        secret: refreshSecret,
      });

      return userInfo;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

const tokenService = new TokenService();
export default tokenService;
