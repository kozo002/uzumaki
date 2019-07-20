'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    title: DataTypes.STRING,
    finishedAt: DataTypes.TIME
  }, {});
  todo.associate = function(models) {
    // associations can be defined here
  };
  return todo;
};