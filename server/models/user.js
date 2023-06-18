const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = function (models) {
    console.log("models", models);
    // associations defined here
    User.hasOne(models.photos, { foreignKey: "userid" });
    User.hasMany(models.posts, { foreignKey: "userid" });
  };

  return User;
};
