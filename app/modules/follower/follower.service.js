import database from '../../database';

import RequestError from '../../lib/RequestError';

const { Follower: followerModel } = database.models;

export default class FollowerService {
  static async findAllFollowers() {
    try {
      const followers = await followerModel.findAll();

      return followers;
    } catch (err) {
      throw new RequestError(err, 500);
    }
  }

  static async deleteFollowers() {
    try {
      await followerModel.destroy({ where: {} });
    } catch (err) {
      throw new RequestError(err, 500);
    }
  }
}
