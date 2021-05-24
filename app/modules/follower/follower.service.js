import database from '../../database';

import ApplicationError from '../../lib/ApplicationError';

const { Follower: followerModel } = database.models;

export default class FollowerService {
  static async findAllFollowers() {
    try {
      const followers = await followerModel.findAll();

      return followers;
    } catch (err) {
      throw new ApplicationError(err, 500);
    }
  }

  static async deleteFollowers() {
    try {
      await followerModel.destroy({ where: {} });
    } catch (err) {
      throw new ApplicationError(err, 500);
    }
  }
}
