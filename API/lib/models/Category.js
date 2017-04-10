'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var models = sequelize.models;

  var Category = sequelize.define('Category', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    categoryKeys: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        Category.belongsToMany(models.Booth, { through: 'BoothCategory' });
        Category.belongsToMany(models.Events, { through: 'EventCategory' });
        Category.belongsToMany(models.User, { through: 'UserCategory' });
        Category.belongsToMany(models.Category, { as: 'related', foreignKey: ' categoryKeys', through: 'RelatedCategories' });
      }
    }
  });

  return Category;
};