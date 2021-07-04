import database from '../../database';

import { BadRequest } from '../../errors';

const { Follower: followerModel } = database.models;

class FollowerService {
  static async findAllFollowers() {
    try {
      const followers = await followerModel.findAll();

      return followers;
    } catch (err) {
      throw new BadRequest(err, 500);
    }
  }

  static async deleteFollowers() {
    try {
      await followerModel.destroy({ where: {} });
    } catch (err) {
      throw new BadRequest(err, 500);
    }
  }
}

export default new FollowerService();
