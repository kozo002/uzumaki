describe('User', () => {
  describe('.fetchGitHubEmail', () => {
    it('fetches and returns primary email', async () => {
      const dummyToken = 'dummy token'
      const dummyEmail = 'dummy@email.com'
      const axios = require('axios')
      axios.get.mockResolvedValue({
        data: [{ primary: true, email: dummyEmail }, { email: 'hoge' }]
      })
      const User = require('../../app/models').User
      const email = await User.fetchGitHubEmail(dummyToken)
      expect(email).toEqual(dummyEmail)
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/user/emails',
        { headers: { Authorization: 'token dummy token' } }
      )
    })
  })

  describe('.findOrCreateBy', () => {
    describe('when the user does not exist', () => {
      it('creates a new user', async () => {
        const dummyName = 'dummy'
        const dummyGithubId = 100
        const dummyEmail = 'dummy@example.com'
        const User = require('../../app/models').User
        expect(await User.count()).toEqual(0)
        const user = await User.findOrCreateBy({
          name: dummyName,
          githubId: dummyGithubId,
          email: dummyEmail,
        })
        expect(user.name).toEqual(dummyName)
        expect(user.githubId).toEqual(dummyGithubId)
        expect(user.email).toEqual(dummyEmail)
        expect(await User.count()).toEqual(1)
      })
    })

    describe('when the user exists', () => {
      it('does not create a new user', async () => {
        const dummyName = 'dummy'
        const dummyGithubId = 100
        const dummyEmail = 'dummy@example.com'
        const User = require('../../app/models').User
        const user = await User.create({
          name: 'example',
          githubId: dummyGithubId,
          email: 'example@example.com',
        })
        expect(await User.count()).toEqual(1)
        const user2 = await User.findOrCreateBy({
          name: dummyName,
          githubId: dummyGithubId,
          email: dummyEmail,
        })
        expect(user2.name).toEqual(dummyName)
        expect(user2.githubId).toEqual(user.githubId)
        expect(user2.email).toEqual(dummyEmail)
        expect(await User.count()).toEqual(1)
      })
    })
  })

  describe('#findGitHubAccessToken', () => {
    it('gets github accessToken from database', async () => {
      const models = require('../../app/models')
      const AccessToken = models.AccessToken
      const User = models.User
      const user = await User.create({
        name: 'hoge',
        githubId: 100,
        email: 'example@example.com',
      })
      const accessToken = await AccessToken.create({
        userId: user.id, token: 'hoge', provider: 'github'
      })
      const accessToken2 = await user.findGitHubAccessToken()
      expect(accessToken2.id).toEqual(accessToken.id)
    })
  })

  describe('#updateOrCreateAccessToken', () => {
    describe('when the accessToken does not exist', () => {
      it('creates a new accessToken', async () => {
        const models = require('../../app/models')
        const User = models.User
        const AccessToken = models.AccessToken
        const user = await User.create({
          name: 'example',
          githubId: 100,
          email: 'example@example.com',
        })
        const dummyToken = 'hoge'
        expect(await AccessToken.count()).toEqual(0)
        const accessToken = await user.updateOrCreateAccessToken({ token: dummyToken })
        expect(accessToken.userId).toEqual(user.id)
        expect(accessToken.token).toEqual(dummyToken)
        expect(await AccessToken.count()).toEqual(1)
      })
    })

    describe('when the accessToken exists', () => {
      it('does not create a new accessToken', async () => {
        const models = require('../../app/models')
        const User = models.User
        const AccessToken = models.AccessToken
        const user = await User.create({
          name: 'example',
          githubId: 100,
          email: 'example@example.com',
        })
        const dummyToken = 'hoge'
        const dummyToken2 = 'hoge2'
        const accessToken = await AccessToken.create({
          userId: user.id,
          token: dummyToken,
          provider: 'github'
        })
        expect(await AccessToken.count()).toEqual(1)
        const accessToken2 = await user.updateOrCreateAccessToken({ token: dummyToken2 })
        expect(accessToken2.userId).toEqual(user.id)
        expect(accessToken2.id).toEqual(accessToken.id)
        expect(accessToken2.token).toEqual(dummyToken2)
        expect(await AccessToken.count()).toEqual(1)
      })
    })
  })
})
