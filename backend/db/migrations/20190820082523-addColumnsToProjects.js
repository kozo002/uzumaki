'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn('Projects', 'startIterationsOn', {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: 'mon',
        values: [
          'mon',
          'tue',
          'wed',
          'thu',
          'fri',
          'sat',
          'sun',
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
