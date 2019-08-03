const jwt = require('jsonwebtoken')

const issuer = [process.env.NODE_ENV || 'development', 'uzumaki'].join('-')

const getSecretKey = () => {
  const { SECRET_KEY } = process.env
  if (!SECRET_KEY) { throw new Error('SECRET_KEY not found') }
  return SECRET_KEY
}

class JWT {
  static encode (user_id) {
    const secretKey = getSecretKey()
    return jwt.sign({ user_id }, secretKey, {
      expiresIn: '7 days',
      issuer,
    })
  }

  static decode (token) {
    const secretKey = getSecretKey()
    return jwt.verify(token, secretKey)
  }
}

module.exports = JWT