'use strict';

module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('AccessToken', {
    token: DataTypes.STRING,
    provider: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});

  AccessToken.associate = function(models) {
    AccessToken.belongsTo(models.User, { foreignKey: 'userId' })
  };

  return AccessToken;
};