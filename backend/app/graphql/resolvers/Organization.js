module.exports = {
  projects: (parent, args, context, info) => {
    return parent.getProjects({
      order: [['createdAt', 'DESC']]
    })
  },
  users: (parent, args, context, info) => {
    return parent.getUsers({
      order: [['createdAt', 'ASC']]
    })
  },
}