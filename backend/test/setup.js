const models = require('../app/models')

global.afterEach(() => {
  Object.values(models.sequelize.models).map(async (model) => {
    await model.destroy({
      truncate: true,
      logging: false,
      restartIdentity: true,
    })
  })
})