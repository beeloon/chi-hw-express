import RequestError from '../../lib/RequestError';

export default class AuthService {
  static async authenticate(username, password) {
    try {
    } catch (err) {
      throw new RequestError(err, 500);
    }
  }
}
