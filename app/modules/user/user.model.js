import SequelizeModule from 'sequelize';
import bcrypt from 'bcrypt';

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
          set(value) {
            const hash = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hash);
          },
        },
        email: {
          type: SequelizeModule.STRING,
          allowNull: false,
          notEmpty: true,
          unique: true,
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
