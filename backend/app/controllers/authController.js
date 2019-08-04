const { Router } = require('express')
const passport = require('passport')
const db = require('../models')
const { user: User } = db
const JWT = require('../utils/jwt')

const router = Router()
const clientOrigin = (() => {
  const env = process.env.NODE_ENV || 'development'
  switch (env) {
    case 'development':
      return 'http://localhost:8080'
    case 'production':
      return 'https://uzumaki.zochang.com'
  }
})()

router.get('/auth', (req, res) => res.send('auth'))

router.get('/auth/github', passport.authenticate('github', {
  scope: ['public_repo', 'user:email'],
}))

router.get('/auth/github/callback', (req, res, next) => {
  passport.authenticate('github', async (err, data) => {
    const transaction = await db.sequelize.transaction()
    try {
      if (err) { throw err }
      const { token, profile } = data
      const email = await User.fetchGitHubEmail(token)
      const attrs = { name: profile.username, githubId: profile.id, email }
      const user = await User.findOrCreateBy(attrs, { transaction })
      await user.updateOrCreateAccessToken({ token }, { transaction })
      const jwt = JWT.encode(user.id)
      transaction.commit()
      res.redirect(`${clientOrigin}/loggedIn?token=${jwt}`)
    } catch (err) {
      transaction.rollback()
      console.error(err)
      res.redirect(`${clientOrigin}/error`)
    }
  })(req, res, next)
})

router.get('/auth/verification', (req, res) => {
  try {
    JWT.decode(req.query.token)
    res.send({ status: 'OK' }, 200)
  } catch (err) {
    console.error(err)
    res.send({ error: err.message }, 422)
  }
})

module.exports = router