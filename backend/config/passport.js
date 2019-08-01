const passport = require('passport')
const GitHubStrategy = require('passport-github')
const models = require('../app/models')

module.exports = function passportConfig () {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  
  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  passport.use('github', new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_AUTH_CALLBACK_URL,
    },
    async (token, refreshToken, profile, cb) => {
      try {
        const user = await models.user.handleGitHubCallback(token, profile)
        cb(null, user)
      } catch (err) {
        cb(err, false)
      }
    }
  ))
}