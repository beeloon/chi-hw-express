import followerService from './follower.service';

class FollowerController {
  constructor() {
    this.followerService = followerService;
  }

  async listAllFollowers(req, res, next) {
    try {
      const followerList = await followerService.findAllFollowers();

      res.json(followerList);
    } catch (err) {
      next(err);
    }
  }

  async deleteAllFollowers(req, res, next) {
    try {
      await followerService.deleteFollowers();

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}

export default new FollowerController();
