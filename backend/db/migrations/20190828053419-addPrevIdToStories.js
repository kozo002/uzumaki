'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Stories', 'prevId', {
      type: Sequelize.INTEGER,
    })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('Stories', 'prevId')
  }
};
