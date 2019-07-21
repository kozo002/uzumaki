const models = require('../../app/models')

const dummyToken = 'dummy token'
const dummyProfile = { id: 100, username: 'exampleuser' }

describe('User', () => {
  describe('handleGitHubCallback', () => {
    describe('when the user has not existed', () => {
      it('creates a new user', async () => {
        await models.user.handleGitHubCallback(dummyToken, dummyProfile)
        const user = await models.user.findOne({
          where: { name: dummyProfile.username, githubId: dummyProfile.id }
        })
        expect(user).not.toBeNull()
        const accessToken = await models.accessToken.findOne({
          where: { userId: user.id, token: dummyToken }
        })
        expect(accessToken).not.toBeNull()
      })
    })

    describe('when the user has existed', () => {
      let user, accessToken

      beforeEach(async () => {
        user = await models.user.create({
          name: dummyProfile.username,
          githubId: dummyProfile.id,
        })
        accessToken = await models.accessToken.create({
          userId: user.id,
          token: 'existing token',
          provider: 'github',
        })
      })

      it('updates the user', async () => {
        await models.user.handleGitHubCallback(dummyToken, dummyProfile)
        const accessToken = await models.accessToken.findOne({
          where: { userId: user.id, token: dummyToken }
        })
        expect(accessToken).not.toBeNull()
      })
    })
  })
})