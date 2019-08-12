'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Organization.associate = function(models) {
    // associations can be defined here
  };
  return Organization;
};