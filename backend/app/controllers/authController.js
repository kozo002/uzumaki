const { Router } = require('express')
const passport = require('passport')

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

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth' }),
  (req, res) => {
    res.redirect(clientOrigin)
  }
)

module.exports = router