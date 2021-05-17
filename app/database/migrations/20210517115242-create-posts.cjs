'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('posts', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      text: DataTypes.TEXT,
      authorId: {
        type: DataTypes.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'authorId',
        },
      },
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('posts');
  },
};
