const { EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')

module.exports = {
  users: (parent, args, { db, eok }, info) =>
    db.User.findAll({ [EXPECTED_OPTIONS_KEY]: eok }),
  user: (parent, { id }, { db, eok }, info) =>
    db.User.findOne({ where: { id } }, { [EXPECTED_OPTIONS_KEY]: eok }),
}