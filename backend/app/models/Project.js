'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Project.associate = function(models) {
    Project.belongsToMany(models.Organization, {
      through: 'OrganizationProjectOwnerships',
      foreignKey: 'projectId',
      otherKey: 'organizationId',
    })
  };
  return Project;
};