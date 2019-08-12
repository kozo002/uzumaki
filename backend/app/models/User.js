'use strict';

module.exports = (sequelize, DataTypes) => {
  const axios = require('axios')

  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    githubId: DataTypes.INTEGER
  }, {});

  User.associate = function(models) {
    User.hasMany(models.AccessToken, { foreignKey: 'userId' })
    User.belongsToMany(models.Organization, {
      through: 'OrganizationUserMemberships',
      foreignKey: 'userId',
      otherKey: 'organizationId',
    })
  };

  User.fetchGitHubEmail = async function (token) {
    const res = await axios.get('https://api.github.com/user/emails', {
      headers: { Authorization: `token ${token}` }
    })
    return (res.data.find(it => it.primary) || {}).email
  }

  User.findOrCreateBy = async function ({ name, githubId, email }, options = {}) {
    let user = await this.findOne({ where: { githubId } })
    if (user === null) {
      user = await this.create({ name, githubId, email }, options)
    } else if (email) {
      user.update({ name, email }, options)
    }
    return user
  }

  User.prototype.findGitHubAccessToken = async function () {
    const accessTokens = await this.getAccessTokens()
    return accessTokens.find(it => it.provider === 'github')
  }

  User.prototype.updateOrCreateAccessToken = async function ({ token }, options = {}) {
    const { AccessToken } = sequelize.models
    let accessToken = await this.findGitHubAccessToken()
    if (accessToken) {
      await accessToken.update({ token }, options)
    } else {
      accessToken = await AccessToken.create({ userId: this.id, token, provider: 'github' }, options)
    }
    return accessToken
  }

  return User;
};