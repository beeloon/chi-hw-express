import SequelizeModule from 'sequelize';

export default class UserModel extends SequelizeModule.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: SequelizeModule.UUID,
          primaryKey: true,
          defaultValue: SequelizeModule.UUIDV4,
        },
        username: {
          type: SequelizeModule.STRING,
          allowNull: false,
        },
        password: {
          type: SequelizeModule.STRING,
          allowNull: false,
        },
        email: {
          type: SequelizeModule.STRING,
          allowNull: false,
          notEmpty: true,
          validate: {
            isEmail: true,
          },
        },
      },
      { timestamps: false, tableName: 'users', sequelize }
    );
  }

  static associate(models) {
    this.hasMany(models.Post, {
      foreignKey: 'authorId',
    });
    this.hasMany(models.Follower, {
      foreignKey: 'followerId',
    });
    this.hasMany(models.Follower, {
      foreignKey: 'targetId',
    });
  }
}
