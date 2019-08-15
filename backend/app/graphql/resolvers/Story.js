module.exports = {
  project: (parent, args, context, info) => parent.getProject(),
  requester: (parent, args, context, info) => parent.getRequester(),
}