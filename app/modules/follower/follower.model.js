import SequelizeModule from 'sequelize';

export default class FollowerModel extends SequelizeModule.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          primaryKey: true,
          type: SequelizeModule.UUID,
          defaultValue: SequelizeModule.UUIDV4,
        },
        followerId: SequelizeModule.UUID,
        targetId: SequelizeModule.UUID,
        status: {
          type: SequelizeModule.ENUM,
          values: ['pending', 'following', 'rejected'],
        },
      },
      { timestamps: false, tableName: 'followers', sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE',
    });
    this.belongsTo(models.User, {
      foreignKey: 'targetId',
      onDelete: 'CASCADE',
    });
  }
}
