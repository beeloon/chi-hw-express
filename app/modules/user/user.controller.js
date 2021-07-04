import userService from './user.service';

class UserController {
  async signupUser(req, res, next) {
    try {
      const user = await userService.createUser(req.body);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await userService.findUserById(id);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async listUsers(req, res, next) {
    try {
      const userList = await userService.findAllUsers();

      res.json(userList);
    } catch (err) {
      next(err);
    }
  }

  async listUserPosts(req, res, next) {
    try {
      const { id } = req.params;

      const userPosts = await userService.getUserPosts(id);

      res.json(userPosts);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const userUpdateBody = req.body;

      const updatedUser = await userService.updateUserById(id, userUpdateBody);

      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      await userService.deleteUserById(id);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  async deleteAllUsers(req, res, next) {
    try {
      await userService.deleteUsers();

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  async getUserFollowers(req, res, next) {
    try {
      const { id: userId } = req.params;

      const userFollowers = await userService.getFollowersByUserId(userId);

      res.json(userFollowers);
    } catch (err) {
      next(err);
    }
  }

  async addFollower(req, res, next) {
    try {
      const { id: followerId } = req.params;
      const { targetId } = req.body;

      await userService.addFollowerForUser(followerId, targetId);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
