'use strict';
const axios = require('axios')

module.exports = (sequelize, DataTypes) => {
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

  user.handleGitHubCallback = async function (token, profile) {
    const { user: User, accessToken: AccessToken } = sequelize.models
    const email = await User.fetchGitHubEmail(token)
    let user = await User.findOne({ where: { githubId: profile.id } })
    const transaction = await sequelize.transaction()

    if (user === null) {
      const data = { name: profile.username, githubId: profile.id, email }
      user = await User.create(data, { transaction })
    } else if (email) {
      user.update({ email }, { transaction })
    }
    const accessTokens = await user.getAccessTokens()
    const accessToken = accessTokens.find(it => it.provider === 'github')
    if (accessToken) {
      await accessToken.update({ token }, { transaction })
    } else {
      await AccessToken.create({ userId: user.id, token, provider: 'github' }, { transaction })
    }
    return user
  }

  return user;
};