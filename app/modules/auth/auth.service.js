import ApplicationError from '../../lib/ApplicationError';

export default class AuthService {
  static async authenticate(username, password) {
    try {
    } catch (err) {
      throw new ApplicationError(err, 500);
    }
  }
}
