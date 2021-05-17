import followerService from './follower.service';

export default class PostController {
  static async listAllFollowers(req, res) {
    const followerList = await followerService.findAllFollowers();

    res.json(followerList);
  }

  static async deleteAllFollowers(req, res) {
    await followerService.deleteFollowers();
  }
}
