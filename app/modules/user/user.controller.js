import { STATUS_CODES } from "http";

import { userService } from "./user.service.js";

export const signupUser = async (req, res) => {
  try {
    const user = req.body;

    await userService.createUser(user);

    res.end(STATUS_CODES[201]);
  } catch (err) {
    res.end(STATUS_CODES[404]);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findUserById(id);

    res.end(JSON.stringify(user));
  } catch (err) {
    res.end(STATUS_CODES[404]);
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();

    res.end(JSON.stringify(users));
  } catch (err) {
    res.end(STATUS_CODES[404]);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const newUser = req.body;

    const updatedUser = await userService.updateUserById(id, newUser);

    res.end(JSON.stringify(updatedUser));
  } catch (err) {
    res.end(STATUS_CODES[404]);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await userService.deleteUserById(id);
    res.end(STATUS_CODES[200]);
  } catch (err) {
    res.end(STATUS_CODES[404]);
  }
};
