import { STATUS_CODES } from "http";

import { userService } from "./user.service";

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

      res.end(JSON.stringify(user));
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }

  async listUsers(req, res) {
    try {
      const users = await userService.findAllUsers();

      res.end(JSON.stringify(users));
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const newUser = req.body;

      const updatedUser = await userService.updateUserById(id, newUser);

      res.end(JSON.stringify(updatedUser));
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      await userService.deleteUserById(id);
      res.end(STATUS_CODES[200]);
    } catch (err) {
      res.end(STATUS_CODES[404]);
    }
  }
}
