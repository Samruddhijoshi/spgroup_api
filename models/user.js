"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    user_email: DataTypes.STRING,
    friend_email: DataTypes.STRING,
    sub_email: DataTypes.STRING,
    blocked: DataTypes.INTEGER
  });

  return User;
};