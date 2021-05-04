import { STATUS_CODES } from "http";

import userService from "./user.service";
import postService from "../post/post.service";

export default class UserController {
  async signupUser(req, res) {
    try {
      const user = req.body;

      await userService.createUser(user);

      res.end(STATUS_CODES[201]);
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.findUserById(id);

      res.json(user);
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }

  async listUsers(req, res) {
    try {
      const userList = await userService.findAllUsers();

      res.json(userList);
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userUpdateData = req.body;

      const updatedUser = await userService.updateUserById(id, userUpdateData);

      res.json(updatedUser);
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      await userService.deleteUserById(id);
      await postService.deleteAllPosts(id);
      res.end(STATUS_CODES[200]);
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }

  async addNewPost(req, res) {
    try {
      const authorId = req.params.id;
      const post = req.body;

      await postService.createPost({ authorId, ...post });

      res.end(STATUS_CODES[201]);
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }
}
