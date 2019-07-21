import { Router } from 'express'
import * as passport from 'passport'

const router = Router()

router.get('/auth', (req, res) => res.send('auth'))

router.get('/auth/github', passport.authenticate('github', {
  scope: ['public_repo', 'user:email'],
}))

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/')
  }
)

export default router