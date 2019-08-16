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
    type: {
      type: DataTypes.ENUM,
      values: [
        'feature',
        'bug',
        'chore',
        'release',
      ],
      defaultValue: 'feature',
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
    Story.belongsTo(models.User, {
      foreignKey: 'requesterId',
      as: 'Requester',
    })
  };

  Story.findAllBelonggingToUser = async function ({ userId, projectId }) {
    const stories = await sequelize.query(`
      select "Stories".* from "Stories"
      inner join "Projects" on "Projects"."id" = "Stories"."projectId"
      inner join "OrganizationProjectOwnerships" on "OrganizationProjectOwnerships"."projectId" = "Projects"."id"
      inner join "Organizations" on "Organizations"."id" = "OrganizationProjectOwnerships"."organizationId"
      inner join "OrganizationUserMemberships" on "OrganizationUserMemberships"."organizationId" = "Organizations"."id"
      inner join "Users" on "Users"."id" = "OrganizationUserMemberships"."userId"
      where "Users"."id" = ?
      and "Projects"."id" = ?
    `, {
      replacements: [userId, projectId],
      model: Story,
      mapToModel: true,
    })
    return stories
  }

  Story.findOneBelonggingToUser = async function ({ userId, projectId, id }) {
    const records = await sequelize.query(`
      select "Stories".* from "Stories"
      inner join "Projects" on "Projects"."id" = "Stories"."projectId"
      inner join "OrganizationProjectOwnerships" on "OrganizationProjectOwnerships"."projectId" = "Projects"."id"
      inner join "Organizations" on "Organizations"."id" = "OrganizationProjectOwnerships"."organizationId"
      inner join "OrganizationUserMemberships" on "OrganizationUserMemberships"."organizationId" = "Organizations"."id"
      inner join "Users" on "Users"."id" = "OrganizationUserMemberships"."userId"
      where "Users"."id" = ?
      and "Projects"."id" = ?
      and "Stories"."id" = ?
    `, {
      replacements: [userId, projectId, id],
      model: Story,
      mapToModel: true,
    })
    return records[0] || null
  }

  return Story;
};