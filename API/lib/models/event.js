'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var models = sequelize.models;

  var Event = sequelize.define('Events', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING(4096),
      validate: {
        isUrl: true
      },
      comment: 'Optional thumbnail image.'
    },
    speaker: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        Event.belongsToMany(models.Category, { through: 'EventCategory' });
        Event.addScope('defaultScope', {
          attributes: ['key', 'description', 'speaker'],
          include: [{ model: models.Category }]
        }, { override: true });
      },
      create: function create(value, options) {
        var event = void 0;
        return this.constructor.prototype.create.apply(this, [value, options]).then(function (createdBooth) {
          event = createdBooth;

          return Promise.all([_lodash2.default.isUndefined(value.categoryKeys) ? null : event.setCategories(value.categoryKeys)]);
        }).then(function () {
          return event.reload();
        });
      }
    },
    instanceMethods: {
      // Override toJSON method, include instanceKeys and serviceKeys instead of objects
      toJSON: function toJSON() {
        var eventValue = {
          key: this.key,
          description: this.description,
          speaker: this.speaker
        };

        if (this.Categories) eventValue.categoryKeys = this.Categories.map(function (category) {
          return category.key;
        });

        return eventValue;
      }
    }
  });

  sequelize.define('EventCategory', {});
  return Event;
};