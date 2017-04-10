'use strict';
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require('../../config/config.js')[env];
var sequelize = new Sequelize(config.url, config);
var db        = {};

//Scan the directory for all .js files for models
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.slice(-3) === '.js')  && (file !== 'index.js');
  })
  //Add each model to sequelize and exports
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

//Calls associate() in each model's classMethods to create model associations
Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

//Adds sequelize db and library to exports
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
