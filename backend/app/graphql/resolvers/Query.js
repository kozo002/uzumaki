const { EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')

module.exports = {
  users: (parent, args, { db, eok }, info) =>
    db.user.findAll({ [EXPECTED_OPTIONS_KEY]: eok }),
  user: (parent, { id }, { db, eok }, info) =>
    db.user.findById(id, { [EXPECTED_OPTIONS_KEY]: eok })
}