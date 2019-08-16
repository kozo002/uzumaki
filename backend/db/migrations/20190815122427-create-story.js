'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      state: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: [
          'unstarted',
          'started',
          'finished',
          'delivered',
          'rejected',
          'accepted',
        ],
        defaultValue: 'unstarted',
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: [
          'feature',
          'bug',
          'chore',
          'release',
        ],
        defaultValue: 'feature',
      },
      inIcebox: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      points: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.INTEGER,
      },
      requesterId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      projectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Stories');
  }
};