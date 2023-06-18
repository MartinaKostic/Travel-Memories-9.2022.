const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelize) {
  const Postphoto = sequelize.define("Postphoto", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isprivate: {
      type: DataTypes.BOOLEAN,
    },
  });
  Postphoto.associate = function (models) {
    Postphoto.belongsTo(models.posts, { foreignKey: "postid" });
  };

  return Postphoto;
};
