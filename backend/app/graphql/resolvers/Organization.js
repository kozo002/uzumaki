module.exports = {
  projects: (parent, args, context, info) => parent.getProjects(),
  users: (parent, args, context, info) => parent.getUsers(),
}