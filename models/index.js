"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
//var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const Op = Sequelize.Op;
// ,{ operatorsAliases: { $or: Op.or } }
const sequelize = new Sequelize('mysql://root:admin@127.0.0.1:3306/spgroup');

var db= {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;