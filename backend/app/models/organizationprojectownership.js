'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrganizationProjectOwnership = sequelize.define('OrganizationProjectOwnership', {
    projectId: DataTypes.INTEGER,
    orgnizationId: DataTypes.INTEGER
  }, {});
  OrganizationProjectOwnership.associate = function(models) {
    // associations can be defined here
  };
  return OrganizationProjectOwnership;
};