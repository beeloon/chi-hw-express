import SequelizeModule from 'sequelize';

export default class PostModel extends SequelizeModule.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          primaryKey: true,
          type: SequelizeModule.UUID,
          defaultValue: SequelizeModule.UUIDV4,
        },
        text: SequelizeModule.TEXT,
        authorId: SequelizeModule.UUID,
      },
      { timestamps: false, tableName: 'posts', sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE',
    });
  }
}
