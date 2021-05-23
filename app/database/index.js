import sequelize from './sequelize';
import connectMongoDB from './mongoose';

export default {
  ...sequelize,
  connectMongoDB,
};
