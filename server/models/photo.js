const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelize) {
  const Photo = sequelize.define("Photos", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Photo.associate = function (models) {
    Photo.belongsTo(models.users, { foreignKey: "userid" });
  };

  return Photo;
};
