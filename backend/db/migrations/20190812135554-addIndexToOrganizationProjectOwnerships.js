'use strict';

const name = 'OrganizationProjectOwnerships_mainIndex'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'OrganizationProjectOwnerships',
      ['projectId', 'organizationId'],
      {
        name,
        unique: true,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('OrganizationProjectOwnerships', name)
  }
};
