const { Router } = require('express')
const passport = require('passport')

const router = Router()

router.get('/auth', (req, res) => res.send('auth'))

router.get('/auth/github', passport.authenticate('github', {
  scope: ['public_repo', 'user:email'],
}))

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth' }),
  (req, res) => {
    res.redirect('/')
  }
)

module.exports = router