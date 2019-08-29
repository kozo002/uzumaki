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
          'UNSTARTED',
          'STARTED',
          'FINISHED',
          'DELIVERED',
          'REJECTED',
          'ACCEPTED',
        ],
        defaultValue: 'UNSTARTED',
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: [
          'FEATURE',
          'BUG',
          'CHORE',
          'RELEASE',
        ],
        defaultValue: 'FEATURE',
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