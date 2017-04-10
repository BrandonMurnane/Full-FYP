'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var models = sequelize.models;

  var Visit = sequelize.define('Visit', {
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    booth: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Usergroup'
    },
    event: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Usergroup'
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        Visit.belongsTo(models.UserGroups, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        Visit.belongsTo(models.User);
        Visit.belongsTo(models.Booth, { foreignKey: 'booth', onDelete: 'CASCADE' });
        Visit.belongsTo(models.Events, { foreignKey: 'event' });
      }
    }
  });

  return Visit;
};