'use strict';

const name = 'OrganizationUserMemberships_mainIndex'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'OrganizationUserMemberships',
      ['userId', 'organizationId'],
      {
        name,
        unique: true,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('OrganizationUserMemberships', name)
  }
};
