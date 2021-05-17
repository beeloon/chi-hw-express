import userService from './user.service';

export default class UserController {
  static async signupUser(req, res, next) {
    res.json(await userService.createUser(req.body));
  }

  static async getUser(req, res, next) {
    const { id } = req.params;

    const user = await userService.findUserById(id);

    res.json(user);
  }

  static async listUsers(req, res, next) {
    const userList = await userService.findAllUsers();

    res.json(userList);
  }

  static async listUserPosts(req, res, next) {
    const { id } = req.params;

    const userPosts = await userService.getUserPosts(id);

    res.json(userPosts);
  }

  static async updateUser(req, res, next) {
    const { id } = req.params;
    const userUpdateBody = req.body;

    const updatedUser = await userService.updateUserById(id, userUpdateBody);

    res.json(updatedUser);
  }

  static async deleteUser(req, res, next) {
    const { id } = req.params;

    await userService.deleteUserById(id);

    res.sendStatus(200);
  }

  static async deleteAllUsers(req, res, next) {
    const { id } = req.params;

    await userService.deleteUsers(id);

    res.sendStatus(200);
  }

  static async getUserFollowers(req, res, next) {
    const { id: userId } = req.params;

    const followers = await userService.getFollowersByUserId(userId);

    res.json(followers);
  }

  static async addFollower(req, res, next) {
    const { id: followerId } = req.params;
    const { targetId } = req.body;

    await userService.createFollowerForUser(followerId, targetId);

    res.sendStatus(200);
  }
}
