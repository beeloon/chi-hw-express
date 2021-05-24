import authService from './auth.service';

export default class PostController {
  static async authenticate(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = await authService.authenticate({ username, password });
    } catch (err) {
      next(err);
    }
  }
}
