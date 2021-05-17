'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('followers', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      followerId: {
        type: DataTypes.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'followerId',
        },
      },
      targetId: {
        type: DataTypes.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'targetId',
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'following', 'rejected'],
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('followers');
  },
};
