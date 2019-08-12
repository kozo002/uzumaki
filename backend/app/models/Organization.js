'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Organization.associate = function(models) {
    Organization.belongsToMany(models.User, {
      through: 'OrganizationUserMembership',
      foreignKey: 'organizationId',
      otherKey: 'userId',
    })
    Organization.belongsToMany(models.Project, {
      through: 'OrganizationProjectOwnership',
      foreignKey: 'organizationId',
      otherKey: 'projectId',
    })
  };
  return Organization;
};