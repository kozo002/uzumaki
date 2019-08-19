const { UserInputError } = require('apollo-server-express')
const { ValidationError } = require('sequelize')

module.exports = async (parent, args, context, info) => {
  const { name, description } = args
  const { user } = context

  let organization
  try {
    organization = await user.createOrganization({ name, description })
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new UserInputError(err.message)
    }
    throw err
  }
  return organization
}