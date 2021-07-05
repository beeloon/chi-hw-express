import { Sequelize } from 'sequelize';
import config from 'config';

import UserModel from '../modules/user/user.model';
import PostModel from '../modules/post/post.model';
import FollowerModel from '../modules/follower/follower.model';

const sequelize = new Sequelize(
  config.get('sql.database'),
  config.get('sql.username'),
  config.get('sql.password'),
  {
    host: config.get('sql.host'),
    dialect: config.get('sql.dialect'),
    logging: false,
  }
);

const models = {
  User: UserModel.init(sequelize),
  Post: PostModel.init(sequelize),
  Follower: FollowerModel.init(sequelize),
};

Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

const database = { models, sequelize };

export default database;
