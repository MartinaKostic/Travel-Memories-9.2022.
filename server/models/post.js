const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelize) {
  const Post = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isprivate: {
      type: DataTypes.BOOLEAN,
    },
  });

  Post.associate = function (models) {
    Post.belongsTo(models.users, { foreignKey: "userid" });
    Post.hasMany(models.postphotos, { foreignKey: "postid" });
  };

  return Post;
};
