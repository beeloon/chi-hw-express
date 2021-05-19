import followerService from './follower.service';

export default class PostController {
  static async listAllFollowers(req, res, next) {
    try {
      const followerList = await followerService.findAllFollowers();

      res.json(followerList);
    } catch (err) {
      next(err);
    }
  }

  static async deleteAllFollowers(req, res, next) {
    try {
      await followerService.deleteFollowers();

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}
