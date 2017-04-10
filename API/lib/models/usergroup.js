'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var models = sequelize.models;

  var UserGroup = sequelize.define('UserGroups', {
    key: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});

  return UserGroup;
};