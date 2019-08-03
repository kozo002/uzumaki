'use strict';

module.exports = (sequelize, DataTypes) => {
  const axios = require('axios')

  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    githubId: DataTypes.INTEGER
  }, {});

  user.associate = function(models) {
    user.hasMany(models.accessToken)
  };

  user.fetchGitHubEmail = async function (token) {
    const res = await axios.get('https://api.github.com/user/emails', {
      headers: { Authorization: `token ${token}` }
    })
    return (res.data.find(it => it.primary) || {}).email
  }

  user.findOrCreateBy = async function ({ name, githubId, email }, options = {}) {
    let user = await this.findOne({ where: { githubId } })
    if (user === null) {
      user = await this.create({ name, githubId, email }, options)
    } else if (email) {
      user.update({ name, email }, options)
    }
    return user
  }

  user.prototype.findGitHubAccessToken = async function () {
    const accessTokens = await this.getAccessTokens()
    return accessTokens.find(it => it.provider === 'github')
  }

  user.prototype.updateOrCreateAccessToken = async function ({ token }, options = {}) {
    const { accessToken: AccessToken } = sequelize.models
    let accessToken = await this.findGitHubAccessToken()
    if (accessToken) {
      await accessToken.update({ token }, options)
    } else {
      accessToken = await AccessToken.create({ userId: this.id, token, provider: 'github' }, options)
    }
    return accessToken
  }

  return user;
};