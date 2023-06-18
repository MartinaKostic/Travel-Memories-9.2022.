//inicijalizacija za sequelize
//->povezivanje s db

const Sequelize = require("sequelize");
const Config = require("../config/database_config");

const sequelize = new Sequelize(Config.DB, Config.USER, Config.PASSWORD, {
  host: Config.HOST,
  dialect: Config.dialect,
  operatorsAliases: false,

  pool: {
    max: Config.pool.max,
    min: Config.pool.min,
    acquire: Config.pool.acquire,
    idle: Config.pool.idle,
  },
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//ode importam tj requiream modele
db.users = require("./user.js")(sequelize, Sequelize);
db.posts = require("./post.js")(sequelize, Sequelize);
db.photos = require("./photo.js")(sequelize, Sequelize);
db.postphotos = require("./postphoto.js")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
