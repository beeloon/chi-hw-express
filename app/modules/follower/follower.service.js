import database from '../../database';

const { Follower: followerModel } = database.models;

export default class FollowerService {
  static async findAllFollowers() {
    const followers = await followerModel.findAll();

    return followers;
  }

  static async deleteFollowers() {
    await followerModel.destroy({ where: {} });
  }
}
