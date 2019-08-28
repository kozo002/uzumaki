'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Stories', 'nextId', {
      type: Sequelize.INTEGER,
    })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('Stories', 'nextId')
  }
};
