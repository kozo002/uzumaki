'use strict';

module.exports = (sequelize, DataTypes) => {
  const accessToken = sequelize.define('accessToken', {
    token: DataTypes.STRING,
    provider: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});

  accessToken.associate = function(models) {
    accessToken.belongsTo(models.user)
  };

  return accessToken;
};