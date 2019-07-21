'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    githubId: DataTypes.INTEGER
  }, {});

  user.associate = function(models) {
    user.hasMany(models.accessToken)
  };

  user.handleGitHubCallback = async function (token, profile) {
    const { user: User, accessToken: AccessToken } = sequelize.models

    let user = await User.findOne({ where: { githubId: profile.id } })
    if (user === null) {
      const data = { name: profile.username, githubId: profile.id }
      user = await User.create(data)
      await AccessToken.create({ userId: user.id, token, provider: 'github' })
    } else {
      const accessTokens = await user.getAccessTokens()
      const accessToken = accessTokens.find(it => it.provider === 'github')
      if (accessToken) {
        await accessToken.update({ token })
      } else {
        await AccessToken.create({ userId: user.id, token, provider: 'github' })
      }
    }
  }

  return user;
};