'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrganizationUserMembership = sequelize.define('OrganizationUserMembership', {
    userId: DataTypes.INTEGER,
    organizationId: DataTypes.INTEGER,
  }, {});
  OrganizationUserMembership.associate = function(models) {
    OrganizationUserMembership.belongsTo(models.Organization, {
      foreignKey: 'organizationId'
    })
    OrganizationUserMembership.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };
  return OrganizationUserMembership;
};