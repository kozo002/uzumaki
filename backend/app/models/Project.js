'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {});

  Project.associate = function(models) {
    Project.belongsToMany(models.Organization, {
      through: 'OrganizationProjectOwnerships',
      foreignKey: 'projectId',
      otherKey: 'organizationId',
    })
  };

  Project.findOneBelonggingToUser = async function ({ id, userId }) {
    const records = await sequelize.query(`
      select * from "Projects"
      inner join "OrganizationProjectOwnerships" on "OrganizationProjectOwnerships"."projectId" = "Projects"."id"
      inner join "Organizations" on "Organizations"."id" = "OrganizationProjectOwnerships"."organizationId"
      inner join "OrganizationUserMemberships" on "OrganizationUserMemberships"."organizationId" = "Organizations"."id"
      where "OrganizationUserMemberships"."userId" = ? and "Projects"."id" = ?
    `, {
      replacements: [userId, id],
      model: Project,
      mapToModel: true
    })
    return records[0] || null
  }

  return Project;
};