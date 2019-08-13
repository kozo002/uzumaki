module.exports = {
  organizations: (parent, args, context, info) => parent.getOrganizations(),
  users: (parent, args, context, info) => parent.getUsers(),
}