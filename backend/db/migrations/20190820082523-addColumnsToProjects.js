'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Projects_startIterationsOn"', { transaction })
      await queryInterface.addColumn('Projects', 'startIterationsOn', {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: 'MON',
        values: [
          'MON',
          'TUE',
          'WED',
          'THU',
          'FRI',
          'SAT',
          'SUN',
        ]
      }, { transaction })
      
      await queryInterface.addColumn('Projects', 'iterationLength', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      }, { transaction })

      await queryInterface.addColumn('Projects', 'velocity', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
      }, { transaction })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn('Projects', 'startIterationsOn', {
        type: Sequelize.ENUM
      }, { transaction })
      await queryInterface.removeColumn('Projects', 'iterationLength', {
        type: Sequelize.INTEGER,
      }, { transaction })
      await queryInterface.removeColumn('Projects', 'velocity', {
        type: Sequelize.INTEGER,
      }, { transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
};
