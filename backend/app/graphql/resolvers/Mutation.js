const { ForbiddenError, UserInputError } = require('apollo-server-express')
const { ValidationError } = require('sequelize')

module.exports = {
  updateOrganization: require('./Mutation/updateOrganization'),
  createProject: require('./Mutation/createProject'),
  updateProject: require('./Mutation/updateProject'),
  createStory: require('./Mutation/createStory'),
}