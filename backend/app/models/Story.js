'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    state: {
      type: DataTypes.ENUM,
      values: [
        'unstarted',
        'started',
        'finished',
        'delivered',
        'rejected',
        'accepted',
      ],
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    points: {
      type: DataTypes.INTEGER,
    },
    requesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
  }, {});

  Story.associate = function(models) {
    Story.belongsTo(models.Project, {
      foreignKey: 'projectId',
    })
  };
  return Story;
};