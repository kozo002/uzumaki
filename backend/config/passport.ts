import * as passport from 'passport'
import * as GitHubStrategy from 'passport-github'
import * as models from '../app/models'

export default function passportConfig () {
  passport.use('github', new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_AUTH_CALLBACK_URL,
    },
    async (token, refreshToken, profile, cb) => {
      try {
        const user = models.user.handleGitHubCallback(token, profile)
        cb(user)
      } catch (err) {
        cb(err)
      }
    }
  ))
}