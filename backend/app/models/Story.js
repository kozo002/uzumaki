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
        'UNSTARTED',
        'STARTED',
        'FINISHED',
        'DELIVERED',
        'REJECTED',
        'ACCEPTED',
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
        'FEATURE',
        'BUG',
        'CHORE',
        'RELEASE',
      ],
      defaultValue: 'FEATURE',
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
    inIcebox: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: true,
      },
      defaultValue: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    prevId: {
      type: DataTypes.INTEGER,
    }
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

  Story.prototype.findPrevOne = async function () {
    const { prevId } = this
    if (prevId === null) { return null }
    return Story.findOne({ where: { id: prevId } })
  }

  Story.prototype.findNextOne = async function () {
    const { id } = this
    return Story.findOne({ where: { prevId: id } })
  }

  Story.prototype.willStart = function (userInput) {
    return this.state === 'UNSTARTED' && userInput.state === 'STARTED'
  }

  /**
   * Use for moving to another pipeline.
   * If the story has prevId, this finds the previous record and the next record and then updates the prevId of the next record with the previous record id.
   * But the story doesn't have the prevId, updates the prevId of the next record to null
   */
  Story.prototype.updatePrevIdOfNextOne = async function (transaction) {
    const options = transaction ? { transaction } : {}
    const prevStory = await this.findPrevOne()
    const nextStory = await this.findNextOne()
    if (prevStory && nextStory) {
      await nextStory.update({ prevId: prevStory.id }, options)
    } else if (prevStory === null && nextStory) {
      await nextStory.update({ prevId: null }, options)
    }
  }

  return Story
}