'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: {
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
  }, {});

  Organization.associate = function(models) {
    Organization.belongsToMany(models.User, {
      through: 'OrganizationUserMemberships',
      foreignKey: 'organizationId',
      otherKey: 'userId',
    })
    Organization.belongsToMany(models.Project, {
      through: 'OrganizationProjectOwnerships',
      foreignKey: 'organizationId',
      otherKey: 'projectId',
    })
  };

  Organization.findOneBelonggingToUser = async function ({ id, userId }) {
    const records = await sequelize.query(`
      select * from "Organizations"
      inner join "OrganizationUserMemberships" on "OrganizationUserMemberships"."organizationId" = "Organizations"."id"
      where "OrganizationUserMemberships"."userId" = ?
      and "Organizations"."id" = ?
    `, {
      replacements: [userId, id],
      model: Organization,
      mapToModel: true
    })
    return records[0] || null
  }

  return Organization;
};