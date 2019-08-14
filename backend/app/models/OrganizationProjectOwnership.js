'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrganizationProjectOwnership = sequelize.define('OrganizationProjectOwnership', {
    projectId: DataTypes.INTEGER,
    organizationId: DataTypes.INTEGER
  }, {});

  OrganizationProjectOwnership.associate = function(models) {
    OrganizationProjectOwnership.belongsTo(models.Organization, {
      foreignKey: 'organizationId'
    })
    OrganizationProjectOwnership.belongsTo(models.Project, {
      foreignKey: 'projectId'
    })
  };
  return OrganizationProjectOwnership;
};