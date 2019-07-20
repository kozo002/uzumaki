'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('todos', [
      {
        title: 'example todo 1',
        finishedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'example todo 2',
        finishedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('todos', null, {});
  }
};
