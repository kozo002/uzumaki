'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrganizationUserMembership = sequelize.define('OrganizationUserMembership', {
    userId: DataTypes.INTEGER,
    organizationId: DataTypes.INTEGER,
  }, {});
  OrganizationUserMembership.associate = function(models) {
    // associations can be defined here
  };
  return OrganizationUserMembership;
};